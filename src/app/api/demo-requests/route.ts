import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { visitorIpFromRequest } from "@/lib/api/client-ip";
import { submitDemoRequestToLaravel } from "@/lib/api/laravel";
import { consumeSharedRateLimit, rateLimitDeniedResponse } from "@/lib/api/rate-limit";

const MAX_BODY_BYTES = 16_384;

type DemoBody = {
  name?: string;
  church_parish?: string;
  diocese_organization?: string;
  country?: string;
  email?: string;
  phone?: string;
  role?: string;
  message?: string;
  captcha_challenge_id?: string;
  captcha_response?: string;
  company_website?: string;
};

function fieldErrors(body: DemoBody): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!body.name?.trim()) errors.name = "Please enter your name.";
  if (!body.church_parish?.trim()) errors.church_parish = "Please enter your church or parish.";
  if (!body.country?.trim()) errors.country = "Please select your country.";
  if (!body.email?.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!body.role?.trim()) errors.role = "Please enter your role.";
  if (!body.message?.trim()) errors.message = "Please enter a message.";
  if (!body.captcha_challenge_id?.trim() || !body.captcha_response?.trim()) {
    errors.captcha_response = "Please complete the security check.";
  }
  if (body.company_website?.trim()) errors.company_website = "Unable to submit.";
  return errors;
}

export async function POST(request: Request) {
  const visitorIp = visitorIpFromRequest(request);
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { success: false, message: "Invalid request.", errors: {} },
      { status: 415 },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, message: "Request is too large.", errors: {} },
      { status: 413 },
    );
  }

  let body: DemoBody;
  try {
    body = JSON.parse(raw) as DemoBody;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request.", errors: {} },
      { status: 400 },
    );
  }

  const clientErrors = fieldErrors(body);
  if (Object.keys(clientErrors).length > 0) {
    return NextResponse.json(
      { success: false, message: "Please check the form.", errors: clientErrors },
      { status: 422 },
    );
  }

  const limited = await consumeSharedRateLimit("marketing_bff_forms", visitorIp, 5, 60_000);
  if (!limited.allowed) {
    const denied = rateLimitDeniedResponse(limited);
    return NextResponse.json(denied.body, { status: denied.status, headers: denied.headers });
  }

  const correlationId = randomUUID();

  const result = await submitDemoRequestToLaravel(
    {
      name: body.name!.trim().slice(0, 120),
      church_parish: body.church_parish!.trim().slice(0, 200),
      diocese_organization: body.diocese_organization?.trim().slice(0, 200) || undefined,
      country: body.country!.trim().slice(0, 120),
      email: body.email!.trim().slice(0, 255),
      phone: body.phone?.trim().slice(0, 40) || undefined,
      role: body.role!.trim().slice(0, 120),
      message: body.message!.trim().slice(0, 5000),
      captcha_challenge_id: body.captcha_challenge_id!.trim(),
      captcha_response: body.captcha_response!.trim(),
      company_website: "",
    },
    correlationId,
    visitorIp,
  );

  if (result.ok) {
    return NextResponse.json({
      success: true,
      message: "Thank you. Your demo request has been received.",
    });
  }

  if (result.status === 422 && result.body?.errors) {
    const mapped: Record<string, string> = {};
    for (const [key, messages] of Object.entries(result.body.errors)) {
      mapped[key] = messages[0] ?? "Please check this field.";
    }
    return NextResponse.json(
      { success: false, message: "Please check the form.", errors: mapped },
      { status: 422 },
    );
  }

  if (result.status === 429) {
    return NextResponse.json(
      {
        success: false,
        message: "Please wait a moment and try again.",
        errors: {},
      },
      { status: 429 },
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "We couldn't complete your request right now. Please try again shortly.",
      errors: {},
    },
    { status: 502 },
  );
}
