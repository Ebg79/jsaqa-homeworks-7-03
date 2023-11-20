const { test, expect } = require('@playwright/test');
const user = require('../user');

test('Успешная авторизация', async ({ page }) => {
  // Открываем страницу авторизации
  await page.goto('https://netology.ru/login');

  // Вводим email и пароль
  await page.fill('input[name="email"]', user.email);
  await page.fill('input[name="password"]', user.password);

  // Нажимаем на кнопку "Войти"
  await Promise.all([
    page.click('button:has-text("Войти")'),
    page.waitForNavigation()
  ]);

  // Проверяем успешную авторизацию
  const profileHeader = await page.waitForSelector('h2:has-text("Мой профиль")');
  expect(profileHeader).toBeTruthy();
});

test('Неуспешная авторизация', async ({ page }) => {
  // Открываем страницу авторизации
  await page.goto('https://netology.ru/login');

  // Вводим невалидные email и пароль
  await page.fill('input[name="email"]', 'invalid@example.com');
  await page.fill('input[name="password"]', 'invalidPassword');

  // Нажимаем на кнопку "Войти"
  await page.click('button:has-text("Войти")');

  // Проверяем сообщение об ошибке авторизации
  const errorText = await page.waitForSelector('div:has-text("Неверный email или пароль")');
  expect(errorText).toBeTruthy();
});