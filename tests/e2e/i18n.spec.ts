import { expect, test } from "@playwright/test";

test("language toggle switches copy, sets html lang and persists", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByTestId("nav-start").click();
  }
  await page.getByTestId("lang-pt").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  if (isMobile) {
    await page.getByTestId("mstart-about").click();
  }
  await expect(page.getByText("Oi, eu sou o Jonathan.")).toBeVisible();

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
});

test("theme toggle switches the dark class", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByTestId("nav-start").click();
  await page.getByRole("button", { name: /dark mode|modo escuro/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", /-dark$/);
});

test("palette picker switches the palette and persists", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) await page.getByTestId("nav-start").click();
  await page.getByTestId("palette-picker").click();
  await page.getByTestId("palette-sunset").click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    "sunset-light",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    "sunset-light",
  );
});
