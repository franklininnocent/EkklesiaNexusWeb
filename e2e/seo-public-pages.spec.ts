import { expect, test } from "@playwright/test";

test.describe("SEO public pages", () => {
  test("home still exposes frozen hash sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#features")).toBeAttached();
    await expect(page.locator("#pricing")).toBeAttached();
    await expect(page.locator("#testimonials")).toBeAttached();
  });

  test("crawlable IA journey with unique document titles", async ({ page }) => {
    await page.goto("/");
    const homeTitle = await page.title();

    await page.goto("/features");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/features$/);
    const featuresTitle = await page.title();
    expect(featuresTitle).not.toBe(homeTitle);

    await page.goto("/features/family-management");
    const detailTitle = await page.title();
    expect(detailTitle).not.toBe(featuresTitle);

    await page.goto("/solutions/catholic-parishes");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.goto("/contact");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("main")).toBeVisible();

    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("Open Application points at the parish app entry", async ({ page }) => {
    await page.goto("/");
    const heroLink = page.locator("main").getByRole("link", { name: "Open Application" });
    await expect(heroLink).toBeVisible();
    const href = await heroLink.getAttribute("href");
    expect(href).toMatch(/\/dashboard$/);
  });

  test("unknown marketing path returns not found", async ({ page }) => {
    const response = await page.goto("/not-a-real-marketing-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/not found|não encontrada/i);
  });

  test("footer links to features hub", async ({ page }) => {
    await page.goto("/");
    const featuresLink = page.locator("footer").getByRole("link", { name: /features/i });
    await expect(featuresLink).toHaveAttribute("href", "/features");
  });

  test("non-production host robots disallows all crawlers", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBeTruthy();
    const body = await response.text();
    expect(body.toLowerCase()).toContain("disallow: /");
  });

  test("contact form rejects empty submission", async ({ request }) => {
    const response = await request.post("/api/contact-enquiries", {
      data: {},
      headers: { "Content-Type": "application/json" },
    });
    expect(response.status()).toBe(422);
  });

  test("invalid feature slug returns 404", async ({ page }) => {
    const response = await page.goto("/features/not-a-real-slug");
    expect(response?.status()).toBe(404);
  });
});
