import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 } });
test.skip(({ isMobile }) => !!isMobile, "desktop only");

test("windows open, drag, minimise, restore, close and persist", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByTestId("taskbar")).toBeVisible();
  await expect(page.locator("[data-window='about']")).toBeVisible();

  // Open Experience from the desktop icon.
  await page.getByTestId("icon-experience").click();
  const win = page.locator("[data-window='experience']");
  await expect(win).toBeVisible();
  await expect(win).toHaveAttribute("data-focused", "true");

  // Drag it by the title bar.
  const bar = win.locator("[data-window-titlebar]");
  const before = await win.boundingBox();
  const barBox = await bar.boundingBox();
  if (!before || !barBox) throw new Error("no box");
  await page.mouse.move(barBox.x + 120, barBox.y + barBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(barBox.x + 320, barBox.y + 150, { steps: 8 });
  await page.mouse.up();
  const after = await win.boundingBox();
  expect(after!.x - before.x).toBeGreaterThan(150);
  expect(after!.y - before.y).toBeGreaterThan(100);

  // Minimise to the taskbar, then restore.
  await win.getByTestId("win-minimize").click();
  await expect(win).toBeHidden();
  const task = page.getByTestId("task-experience");
  await expect(task).toHaveAttribute("data-minimized", "true");
  await task.click();
  await expect(win).toBeVisible();

  // Layout survives a reload.
  await page.reload();
  const persisted = await page
    .locator("[data-window='experience']")
    .boundingBox();
  expect(Math.abs(persisted!.x - after!.x)).toBeLessThan(2);

  // Escape closes the focused window.
  await page.locator("[data-window='experience']").click();
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-window='experience']")).toBeHidden();
  await expect(page.getByTestId("task-experience")).toHaveCount(0);
});

test("maximise fills the desktop and the start menu launches sections", async ({
  page,
}) => {
  await page.goto("/");
  const about = page.locator("[data-window='about']");
  await about.getByTestId("win-maximize").click();
  await expect(about).toHaveAttribute("data-maximized", "true");
  const layer = await page.getByTestId("window-layer").boundingBox();
  const box = await about.boundingBox();
  expect(Math.round(box!.width)).toBe(Math.round(layer!.width));

  await page.getByTestId("start-button").click();
  await page.getByTestId("start-contact").click();
  await expect(page.locator("[data-window='contact']")).toBeVisible();
  await expect(page.getByTestId("open-to-work").first()).toBeVisible();
});

test("resize handles change the window size", async ({ page }) => {
  await page.goto("/");
  const about = page.locator("[data-window='about']");
  const before = await about.boundingBox();
  const handle = about.locator("[data-resize-handle='se']");
  const h = await handle.boundingBox();
  await page.mouse.move(h!.x + h!.width / 2, h!.y + h!.height / 2);
  await page.mouse.down();
  await page.mouse.move(h!.x + 120, h!.y + 80, { steps: 6 });
  await page.mouse.up();
  const after = await about.boundingBox();
  expect(after!.width - before!.width).toBeGreaterThan(80);
  expect(after!.height - before!.height).toBeGreaterThan(50);
});

test("photography opens a gallery and a photo lightbox", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("icon-photography").click();
  await expect(page.locator("[data-window='photography']")).toBeVisible();
  await page.getByTestId("photo-DXPkqOiAUjN").click();
  await expect(page.getByRole("link", { name: /instagram/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-window='photography']")).toBeVisible();
});

test("widgets are draggable and reset returns About and Skills", async ({
  page,
}) => {
  await page.goto("/");
  const clock = page.locator("[data-widget='clock']");
  const before = await clock.boundingBox();
  const bar = clock.locator("div").first();
  const b = await bar.boundingBox();
  await page.mouse.move(b!.x + 60, b!.y + b!.height / 2);
  await page.mouse.down();
  await page.mouse.move(b!.x + 60, b!.y + 200, { steps: 6 });
  await page.mouse.up();
  const after = await clock.boundingBox();
  expect(after!.y - before!.y).toBeGreaterThan(150);

  await page.locator("[data-window='skills']").getByTestId("win-close").click();
  await page.getByTestId("reset-layout").click();
  await expect(page.locator("[data-window='skills']")).toBeVisible();
  await expect(page.locator("[data-window='about']")).toBeVisible();
  const reset = await clock.boundingBox();
  expect(Math.abs(reset!.y - before!.y)).toBeLessThan(2);
});
