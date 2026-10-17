import { defineConfig, devices } from "@playwright/test";

process.env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS ??= "1";

const functionalOnly = /usable at 375|legal pages|zoom 200|not found|large text|around breakpoints|carousel and contact/;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  workers: 3,
  retries: 1,
  timeout: 45_000,
  reporter: [["list"]],
  use: {
    baseURL: process.env.MARKETING_E2E_BASE_URL || "http://localhost:3010",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3010",
    // Reuse only when explicitly requested; otherwise pricing e2e needs fixture env on a fresh dev server.
    reuseExistingServer: process.env.PLAYWRIGHT_REUSE_EXISTING_SERVER === "1",
    timeout: 120_000,
    env: {
      ...process.env,
      MARKETING_GEO_HEADER_SECRET: process.env.MARKETING_GEO_HEADER_SECRET || "e2e-geo-secret",
      MARKETING_PRICING_FIXTURE_JSON:
        process.env.MARKETING_PRICING_FIXTURE_JSON ??
        JSON.stringify({
        success: true,
        data: [
          {
            code: "STARTER",
            name: "Starter",
            pricing_type: "FIXED",
            currency_code: "INR",
            monthly_price: "1499.00",
            annual_price: "14990.00",
            regional_prices: {
              INR: { monthly_price: "1499.00", annual_price: "14990.00" },
              USD: { monthly_price: "39.00", annual_price: "390.00" },
              BRL: { monthly_price: "99.00", annual_price: "990.00" },
            },
          },
          {
            code: "STANDARD",
            name: "Standard",
            pricing_type: "FIXED",
            currency_code: "INR",
            monthly_price: "2999.00",
            annual_price: "29990.00",
            regional_prices: {
              INR: { monthly_price: "2999.00", annual_price: "29990.00" },
              USD: { monthly_price: "59.00", annual_price: "590.00" },
              BRL: { monthly_price: "199.00", annual_price: "1990.00" },
            },
          },
          {
            code: "PROFESSIONAL",
            name: "Professional",
            pricing_type: "FIXED",
            currency_code: "INR",
            monthly_price: "4999.00",
            annual_price: "49990.00",
            regional_prices: {
              INR: { monthly_price: "4999.00", annual_price: "49990.00" },
              USD: { monthly_price: "89.00", annual_price: "890.00" },
              BRL: { monthly_price: "399.00", annual_price: "3990.00" },
            },
          },
        ],
      }),
    },
  },
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"], channel: "chrome" },
      grep: functionalOnly,
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 13"] },
      grep: functionalOnly,
    },
  ],
});
