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
  } else {
    // Laptop-sized desktops start with no windows open. Under heavy parallel
    // load the first click occasionally lands mid-render, so retry until the
    // window is actually there.
    const about = page.locator("[data-window='about']");
    for (let i = 0; i < 3 && !(await about.isVisible()); i++) {
      await page.getByTestId("icon-about").click();
      await about.waitFor({ state: "visible", timeout: 3000 }).catch(() => {});
    }
    await expect(about).toBeVisible();
  }
  await expect(page.getByText("Oi, eu sou o Jonathan.")).toBeVisible({
    timeout: 10_000,
  });

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
  await page.getByTestId("palette-forest").click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    "forest-light",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    "forest-light",
  );
});
