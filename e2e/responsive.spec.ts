import { expect, test, type Page } from "@playwright/test";

const routes = ["/", "/privacy", "/terms", "/preview/plans"] as const;

const viewports: { name: string; width: number; height: number }[] = [
  { name: "small-mobile", width: 320, height: 568 },
  { name: "standard-mobile", width: 360, height: 640 },
  { name: "mobile", width: 375, height: 667 },
  { name: "modern-mobile", width: 390, height: 844 },
  { name: "large-mobile", width: 430, height: 932 },
  { name: "landscape-mobile", width: 844, height: 390 },
  { name: "small-tablet", width: 600, height: 960 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "large-tablet", width: 1024, height: 768 },
  { name: "small-laptop", width: 1280, height: 720 },
  { name: "laptop", width: 1366, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "large-desktop", width: 1920, height: 1080 },
  { name: "ultrawide", width: 2560, height: 1440 },
];

async function documentOverflow(page: Page): Promise<number> {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const width = Math.max(doc.scrollWidth, body.scrollWidth);
    return width - window.innerWidth;
  });
}

async function assertNoPageOverflow(page: Page) {
  const overflow = await documentOverflow(page);
  expect(overflow, `horizontal overflow ${overflow}px`).toBeLessThanOrEqual(1);
}

async function dismissDevOverlay(page: Page) {
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; pointer-events: none !important; }",
  }).catch(() => undefined);
  await page.evaluate(() => {
    document.querySelectorAll("nextjs-portal").forEach((node) => node.remove());
  });
}

async function waitForHeaderHydration(page: Page) {
  await page.waitForFunction(() => {
    const header = document.querySelector("header");
    if (!header) return false;
    return Object.keys(header).some((key) => key.startsWith("__react"));
  });
}

async function openMobileNav(page: Page) {
  await waitForHeaderHydration(page);
  await dismissDevOverlay(page);
  const button = page.locator("header").getByRole("button", { name: /open menu/i });
  await expect(button).toBeVisible();
  await button.click({ force: true });
  const nav = page.locator("#mobile-nav");
  if (!(await nav.isVisible().catch(() => false))) {
    await button.click({ force: true });
  }
  await expect(nav).toBeVisible({ timeout: 10_000 });
}

async function gotoRoute(page: Page, route: string) {
  let lastStatus: number | undefined;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    lastStatus = response?.status();
    if (lastStatus && lastStatus < 500) {
      return response;
    }
    await page.waitForTimeout(400 * (attempt + 1));
  }
  throw new Error(`Navigation to ${route} failed with status ${lastStatus ?? "unknown"}`);
}

test.describe("marketing site responsive geometry", () => {
  for (const vp of viewports) {
    for (const route of routes) {
      test(`${route} ${vp.name} ${vp.width}x${vp.height}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        const response = await gotoRoute(page, route);
        expect(response?.ok()).toBeTruthy();
        await expect(page.locator("body")).toBeVisible();
        await assertNoPageOverflow(page);

        if (route === "/preview/plans") {
          return;
        }

        const header = page.locator("header").first();
        await expect(header).toBeVisible();

        if (vp.width < 1024) {
          await expect(page.getByRole("button", { name: /open menu/i })).toBeVisible();
          await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
        } else {
          await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
        }
      });
    }
  }
});

test("home mobile menu, pricing, and contact remain usable at 375", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await gotoRoute(page, "/");
  await openMobileNav(page);
  await expect(page.getByRole("link", { name: "Features" }).nth(0)).toBeVisible();
  await expect(page.getByRole("link", { name: "Get Started" }).nth(0)).toBeVisible();
  await page.getByRole("button", { name: /close menu/i }).click({ force: true });
  await expect(page.locator("#mobile-nav")).toHaveCount(0);

  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "Pricing Overview" })).toBeVisible();
  const showPrice = page.getByRole("button", { name: "Show Price" }).first();
  await showPrice.click();
  await expect(page.getByRole("button", { name: "Hide Price" }).first()).toBeVisible();
  await expect(page.getByText("/ month").first()).toBeVisible();

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.getByRole("textbox", { name: "Name" })).toBeVisible();
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByRole("alert").first()).toBeVisible();
  await assertNoPageOverflow(page);
});

test("home has no overflow at widths immediately around breakpoints", async ({ page }) => {
  for (const width of [639, 767, 1023, 1279]) {
    await page.setViewportSize({ width, height: 800 });
    await gotoRoute(page, "/");
    await assertNoPageOverflow(page);
  }
});

test("home remains usable at 200% zoom", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "document.documentElement.style.zoom is Chromium-only");
  await page.setViewportSize({ width: 1280, height: 800 });
  await gotoRoute(page, "/");
  await page.evaluate(() => {
    document.documentElement.style.zoom = "2";
  });
  await expect(page.locator("body")).toBeVisible();
  await expect(page.getByRole("heading", { name: /EkklesiaNexus/i }).first()).toBeVisible();
});

test("home remains readable with large root text", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoRoute(page, "/");
  await page.addStyleTag({ content: "html { font-size: 20px !important; }" });
  await dismissDevOverlay(page);
  await assertNoPageOverflow(page);
  await expect(page.getByRole("button", { name: /open menu/i })).toBeVisible();
});

test("not found page is usable on a narrow phone", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  const response = await gotoRoute(page, "/this-route-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Go to homepage" })).toBeVisible();
  await assertNoPageOverflow(page);
});

test("solutions carousel and contact wrap without page overflow at 360", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await gotoRoute(page, "/");
  await dismissDevOverlay(page);
  await page.locator("#solutions").waitFor({ state: "visible" });
  await page.locator("#solutions").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Next slides" }).first().click();
  await page.locator("#contact").waitFor({ state: "attached" });
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.getByRole("textbox", { name: "Name" })).toBeVisible();
  await assertNoPageOverflow(page);
});

test("legal pages expose homepage destinations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoRoute(page, "/privacy");
  await openMobileNav(page);
  await page.locator("#mobile-nav").getByRole("link", { name: "Pricing" }).click({ force: true });
  await page.waitForURL(/\/#pricing/);
  await expect(page.locator("#pricing")).toBeVisible();
});
