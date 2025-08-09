import { test, expect } from '@playwright/test';

//simple calculation
test('simple calcualtion without logging in', async ({ page }) => {
  await page.goto('http://localhost:8080/index.html');

  await page.click('button.key-1');

  let result = await page.locator('#text-display').textContent();
  expect(result?.trim()).toBe('I');

  await page.click('button.key-add');

  await page.click('button.key-2');

  result = await page.locator('#text-display').textContent();
  expect(result?.trim()).toBe('II');
  await page.click('button.key-add');

  await page.click('button.key-3');

  result = await page.locator('#text-display').textContent();
  expect(result?.trim()).toBe('III');
  await page.click('button.key-add');

  await page.click('button.key-4');

  result = await page.locator('#text-display').textContent();
  expect(result?.trim()).toBe('IIII');
  await page.click('button.key-divide');

  await page.click('button.key-5');

  result = await page.locator('#text-display').textContent();
  expect(result?.trim()).toBe('V');

  await page.click('button.key-equals');

  result = await page.locator('#text-display').textContent();
  expect(result?.trim()).toBe('II');
});

//calculator calculation conversion
test('if calculator correctly converts 3 times 33 to modern Roman numera/', async ({ page }) => {
  await page.goto('http://localhost:8080/index.html');

  await page.click('button.key-3');
  await page.click('button.key-multiply');
  await page.click('button.key-3');
  await page.click('button.key-3');
  await page.click('button.key-equals');

  let result = await page.locator('#text-display').textContent();
  expect(result?.trim()).toBe('LXXXXVIIII');

await page.click('button.key-modern');

await page.waitForFunction(() => {
  const el = document.querySelector('#text-display');
  return el && el.textContent.trim() === 'XCIX';
});

let modernResult = await page.locator('#text-display').textContent();
expect(modernResult?.trim()).toBe('XCIX');

});

//calculator registration
test('successful registration', async ({ page }) => {
    await page.goto('http://localhost:8080/');
  
    await page.click('a[href="register"]');
  
    await expect(page).toHaveURL(/.*register/);
  
    const email = 'hello@example.com';
    const password = 'abcABC123!';
  
    const emailInput = page.locator('input#email');
    const passwordInput = page.locator('input#password');
  
    await emailInput.fill(email);
    await passwordInput.fill(password);
  
    await page.click('button[type="submit"]');
  
    // After submission, inputs should now turn green (check for class with "green" or "success")
    await expect(emailInput).toHaveClass(/.*(green|valid|success).*/i);
    await expect(passwordInput).toHaveClass(/.*(green|valid|success).*/i);
  
    // Check for success message
    const successMsg = page.locator('text=/registration successful/i');
    await expect(successMsg).toBeVisible();
  });
  
//calculator login
test('successful login', async ({ page }) => {
    await page.goto('http://localhost:8080/');
  
    await page.click('a[href="register"]');
    const email = 'hello@example.com';
    const password = 'abcABC123!';  
    await page.fill('input#email', email);
    await page.fill('input#password', password);
    page.click('button[type="submit"]'),
  
    await page.click('a[href="login"]');
    await page.fill('input#email', email);
    await page.fill('input#password', password);
    page.click('button[type="submit"]'),
  
    await expect(page).toHaveURL(/\/(index\.html)?$/);
  
    await expect(page.locator('#nav-history')).toBeVisible();
    await expect(page.locator('#nav-logout')).toBeVisible();
    await expect(page.locator('#nav-unregister')).toBeVisible();
  });

  
//history
  test('if user history is correctly recorded', async ({ page }) => {
    await page.goto('http://localhost:8080/');
  
    await page.click('a[href="register"]');
    const email = `user${Date.now()}@example.com`;
    const password = 'abcABC123!';
    await page.fill('input#email', email);
    await page.fill('input#password', password);
    await page.click('button[type="submit"]');
  
    await page.click('a[href="login"]');
    await page.fill('input#email', email);
    await page.fill('input#password', password);
    await page.click('button[type="submit"]');
  
    await expect(page.locator('#text-display')).toBeVisible();
  
    const press = async (key) => await page.click(`button.key-${key}`);
  
    await press('1');
    await press('add');
    await press('2');
    await press('add');
    await press('3');
    await press('equals');
  
    await press('subtract');
    await press('2');
    await press('equals');
  
    await press('multiply');
    await press('8');
    await press('equals');
  
    await press('5');
    await press('multiply');
    await press('8');
    await press('equals');
  
    await press('divide');
    await press('5');
    await press('equals');
  
    await page.click('a[href="history"]');
    await expect(page).toHaveURL(/.*history/);
  
    const historyContent = page.locator('body');
    const historyText = await historyContent.textContent();
  
    expect(historyText).toMatch(/I\s*\+\s*II\s*\+\s*III\s*=\s*VI/i);
    expect(historyText).toMatch(/VI\s*−\s*II\s*=\s*IIII/i);
    expect(historyText).toMatch(/IIII\s*×\s*VIII\s*=\s*XXXII/i);
    expect(historyText).toMatch(/V\s*×\s*VIII\s*=\s*XXXXXXXX/i);
    expect(historyText).toMatch(/XXXXXXXX\s*÷\s*V\s*=\s*VIII/i);
  });
  
//logout
  test('if logout is successful', async ({ page }) => {
    await page.goto('http://localhost:8080/');
  
    await page.click('a[href="register"]');
    const email = `hello@example.com`;
    const password = 'abcABC123!';
    await page.fill('input#email', email);
    await page.fill('input#password', password);
    await page.click('button[type="submit"]');
  
    await page.click('a[href="login"]');
    await page.fill('input#email', email);
    await page.fill('input#password', password);
    await page.click('button[type="submit"]');

    await expect(page.locator('#nav-history')).toBeVisible();
    await expect(page.locator('#nav-logout')).toBeVisible();
    await expect(page.locator('#nav-unregister')).toBeVisible();
  
    await page.click('#nav-logout');
  
    await expect(page.locator('#nav-login')).toBeVisible();
    await expect(page.locator('#nav-register')).toBeVisible();
    await expect(page.locator('#nav-history')).toHaveClass(/hidden/);
    await expect(page.locator('#nav-unregister')).toHaveClass(/hidden/);
    await expect(page.locator('#nav-logout')).toHaveClass(/hidden/);
  
  });
  