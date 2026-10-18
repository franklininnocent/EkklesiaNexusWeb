import { expect, test } from "@playwright/test";

test("Portuguese homepage renders localized hero and language switcher", async ({ page }) => {
  await page.goto("/pt-br", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(
    page.locator("#home p").getByText("A Próxima Geração de Sistema de Gestão de Igrejas.", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Idioma" })).toBeVisible();
  await expect(page.getByRole("link", { name: "English" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Português (Brasil)", exact: true })).toHaveAttribute(
    "aria-current",
    "true",
  );
});

test("language switcher updates homepage copy on client navigation", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(
    page.locator("#home p").getByText(/Church management software for parish administrators/i),
  ).toBeVisible();
  await page.getByRole("navigation", { name: "Language" }).getByRole("link", { name: "Português (Brasil)", exact: true }).click();
  await expect(page).toHaveURL(/\/pt-br/);
  await expect(
    page.locator("#home p").getByText("A Próxima Geração de Sistema de Gestão de Igrejas.", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Idioma" })
    .getByRole("link", { name: "English", exact: true })
    .first()
    .click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.locator("#home p").getByText(/Church management software for parish administrators/i),
  ).toBeVisible();
});

test("language switcher maps privacy route", async ({ page }) => {
  await page.goto("/privacy", { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: "Português (Brasil)", exact: true }).click();
  await expect(page).toHaveURL(/\/pt-br\/privacy/);
  await expect(page.getByRole("heading", { name: "Privacidade" })).toBeVisible();
});

test("English homepage keeps canonical URLs", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.locator("#home p").getByText(/Church management software for parish administrators/i),
  ).toBeVisible();
});

test("device mock people names follow selected locale", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Francis Mathew").first()).toBeVisible();
  await expect(page.getByText("Anthony George").first()).toBeVisible();

  await page.getByRole("navigation", { name: "Language" }).getByRole("link", { name: "Português (Brasil)", exact: true }).click();
  await expect(page).toHaveURL(/\/pt-br/);
  await expect(page.getByText("Francisco Matos").first()).toBeVisible();
  await expect(page.getByText("Antônio Jorge").first()).toBeVisible();
  await expect(page.getByText("Anthony George")).toHaveCount(0);
});

test("testimonial display names resolve from catalogs", async ({ page }) => {
  await page.goto("/pt-br#testimonials", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Priya Menon").first()).toBeVisible();
  await page.getByRole("navigation", { name: "Idioma" }).getByRole("link", { name: "English", exact: true }).first().click();
  await expect(page.getByText("Priya Menon").first()).toBeVisible();
});

test("contact CAPTCHA UI is localized on pt-br", async ({ page }) => {
  await page.goto("/pt-br#contact", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Digite os caracteres exibidos. Letras maiúsculas e minúsculas não importam.")).toBeVisible();
  await expect(page.getByPlaceholder("Digite os caracteres")).toBeVisible();
  await expect(page.getByRole("button", { name: "Atualizar verificação de segurança" })).toBeVisible();
});

test("contact CAPTCHA UI stays English on en-US", async ({ page }) => {
  await page.goto("/#contact", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Enter the characters shown. Letters are case-insensitive.")).toBeVisible();
  await expect(page.getByPlaceholder("Enter characters")).toBeVisible();
});

test("switching locale updates contact CAPTCHA copy", async ({ page }) => {
  await page.goto("/#contact", { waitUntil: "domcontentloaded" });
  await expect(page.getByPlaceholder("Enter characters")).toBeVisible();
  await page.getByRole("navigation", { name: "Language" }).getByRole("link", { name: "Português (Brasil)", exact: true }).click();
  await expect(page).toHaveURL(/\/pt-br/);
  await expect(page.getByPlaceholder("Digite os caracteres")).toBeVisible();
});

test("Portuguese pages do not expose raw translation keys", async ({ page }) => {
  await page.goto("/pt-br", { waitUntil: "domcontentloaded" });
  const bodyText = await page.locator("body").innerText();
  expect(bodyText).not.toMatch(/\[missing:/);
  expect(bodyText).not.toMatch(/home\.hero\./);
});
