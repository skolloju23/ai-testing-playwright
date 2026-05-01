const { test, expect } = require('@playwright/test');

test.describe('AI Testing - Login Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
  });

  test('successful login with valid credentials', async ({ page }) => {
    await page.fill('#username', 'student');
    await page.fill('#password', 'Password123');
    await page.click('#submit');

    await expect(page).toHaveURL(/logged-in-successfully/);
    await expect(page.locator('h1')).toContainText('Logged In Successfully');
  });

  test('invalid password shows error message', async ({ page }) => {
    await page.fill('#username', 'student');
    await page.fill('#password', 'WrongPassword');
    await page.click('#submit');

    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toContainText('Your password is invalid');
  });

  test('empty username and password validation', async ({ page }) => {
    await page.click('#submit');

    await expect(page.locator('#error')).toBeVisible();
  });

  test('long input edge case', async ({ page }) => {
    const longText = 'a'.repeat(200);

    await page.fill('#username', longText);
    await page.fill('#password', longText);
    await page.click('#submit');

    await expect(page.locator('#error')).toBeVisible();
  });
});
