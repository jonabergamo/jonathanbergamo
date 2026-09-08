import { expect, test } from "@playwright/test";

test.skip(({ isMobile }) => !isMobile, "mobile only");

test("phone shows the home screen, opens sections as sheets, no resize handles", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByTestId("mobile-shell")).toBeVisible();
  await expect(page.getByTestId("bottom-nav")).toBeVisible();
  await expect(page.getByTestId("taskbar")).toHaveCount(0);

  await page.getByTestId("nav-start").click();
  await page.getByTestId("mstart-projects").click();
  const sheet = page.getByTestId("sheet-projects");
  await expect(sheet).toBeVisible();
  await expect(page.locator("[data-resize-handle]")).toHaveCount(0);
  await expect(page.getByTestId("project-tech-team-platform")).toBeVisible();

  // Home keeps the app running; the tab brings it back.
  await page.getByTestId("nav-home").click();
  await expect(sheet).toBeHidden();
  await page.getByTestId("nav-projects").click();
  await expect(sheet).toBeVisible();

  await page.getByTestId("sheet-close").click();
  await expect(sheet).toBeHidden();
  await expect(page.getByTestId("nav-projects")).toHaveCount(0);
});
