import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { secretsEqual } from "@/lib/api/secrets";

export async function POST(request: Request) {
  const secret = process.env.MARKETING_REVALIDATE_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ success: false, message: "Revalidation is not configured." }, { status: 503 });
  }

  const header = request.headers.get("x-revalidate-secret")?.trim() ?? "";
  if (header === "" || !secretsEqual(header, secret)) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const paths = [
    "/",
    "/pt-br",
    "/features",
    "/about",
    "/contact",
    "/solutions/catholic-parishes",
    "/features/family-management",
    "/features/member-management",
    "/features/sacramental-registers",
    "/features/mass-intentions",
    "/features/ministries-and-groups",
    "/features/stewardship-and-finance",
    "/features/church-analytics",
    "/preview/plans",
    "/sitemap.xml",
    "/robots.txt",
  ];

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ success: true, revalidated: true, paths });
}
