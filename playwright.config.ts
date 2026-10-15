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
    reuseExistingServer: true,
    timeout: 120_000,
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
