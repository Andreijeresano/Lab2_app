import { test, expect } from '@playwright/test';

test('navigation, direct URLs, and missing-page recovery', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Your campus.A world of possibilities.');
  for (const name of ['Students', 'Courses', 'About', 'Home']) {
    await page.getByRole('navigation').getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveTitle(`${name} | Campus`);
    await expect(page.getByRole('navigation').getByRole('link', { name, exact: true })).toHaveAttribute('aria-current', 'page');
    await page.reload();
    await expect(page).toHaveTitle(`${name} | Campus`);
  }
  await page.goto('/does-not-exist');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page took a study break.');
  await page.getByRole('link', { name: 'Back to home' }).click();
  await expect(page).toHaveURL('/');
  expect(errors).toEqual([]);
});

test('students combine search and filters, reset, and show accessible profiles', async ({ page }) => {
  await page.goto('/students');
  await expect(page.locator('.student-card')).toHaveCount(6);
  await page.getByLabel('Filter by program').selectOption('Computer Science');
  await expect(page.locator('.student-card')).toHaveCount(2);
  await page.getByLabel('Filter by year level').selectOption('3');
  await expect(page.locator('.student-card')).toHaveCount(1);
  const profileButton = page.getByRole('button', { name: 'View profile of Sofia Martinez' });
  await profileButton.click();
  const dialog = page.getByRole('dialog', { name: 'Sofia Martinez' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('sofia.martinez@example.edu');
  await expect(dialog.locator('.detail-courses li')).toHaveCount(3);
  await expect(dialog.getByRole('button', { name: 'Close details' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(profileButton).toBeFocused();
  await page.getByLabel('Search students by name, ID, or email').fill('nonexistent');
  await expect(page.getByRole('heading', { name: 'No students found' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear all filters' }).click();
  await expect(page.locator('.student-card')).toHaveCount(6);
  await page.getByLabel('Search students by name, ID, or email').fill('  OLIVIA.SANTOS@EXAMPLE.EDU  ');
  await expect(page.locator('.student-card')).toHaveCount(1);
  await expect(page.locator('.student-card')).toContainText('Olivia Santos');
});

test('course links preserve department filters and course details', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /^BSCS Computer Science/ }).click();
  await expect(page.getByLabel('Filter by department')).toHaveValue('Computer Science');
  await expect(page.locator('.course-card')).toHaveCount(2);
  await page.reload();
  await expect(page.locator('.course-card')).toHaveCount(2);
  await page.getByLabel('Filter by department').selectOption('Information Technology');
  await expect(page.getByLabel('Filter by department')).toHaveValue('Information Technology');
  await page.goBack();
  await expect(page.getByLabel('Filter by department')).toHaveValue('Computer Science');
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.locator('.course-card')).toHaveCount(6);
  await page.getByLabel('Search by course name, code, or instructor').fill('marcus');
  await expect(page.locator('.course-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'View details for Web Development' }).click();
  const dialog = page.getByRole('dialog', { name: 'Web Development' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('React components');
  await expect(dialog).toContainText('Prof. Marcus Lee');
  await dialog.getByRole('button', { name: 'Close details' }).click();
  await expect(dialog).not.toBeVisible();
  await page.getByLabel('Search by course name, code, or instructor').fill('nonexistent');
  await expect(page.getByRole('heading', { name: 'No courses found' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear all filters' }).click();
  await expect(page.locator('.course-card')).toHaveCount(6);
});

for (const width of [320, 390, 768, 1440]) {
  test(`all pages fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/students', '/courses', '/about']) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const fits = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
      expect(fits, `Horizontal overflow on ${path} at ${width}px`).toBe(true);
    }
    if (width === 1440 || width === 390) {
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `test-results/campus-${width}.png`, fullPage: true, animations: 'disabled' });
    }
  });
}
