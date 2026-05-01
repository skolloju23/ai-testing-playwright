const { test, expect } = require('@playwright/test');

test.describe('AI Testing - Session & Security', () => {

  test('access dashboard without login', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/logged-in-successfully/');

    // Expect redirect or failure
    await expect(page).not.toHaveURL(/logged-in-successfully/);
  });

  test('session persistence after refresh', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.fill('#username', 'student');
    await page.fill('#password', 'Password123');
    await page.click('#submit');

    await page.reload();

    // Check if still logged in
    await expect(page.locator('h1')).toContainText('Logged In Successfully');
  });

  test('back button after logout', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.fill('#username', 'student');
    await page.fill('#password', 'Password123');
    await page.click('#submit');

    await page.click('text=Log out');

    await page.goBack();

    // Should not allow access
    await expect(page).not.toHaveURL(/logged-in-successfully/);
  });

});
