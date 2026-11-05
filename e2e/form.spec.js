// @ts-check
import { test, expect } from "@playwright/test";

// Partie 4 - étape 1 accéder au site local
test('Should open the form page', async ({ page }) => {
    await page.goto('http://localhost:3000');
});

// Partie 4 - étape 2 compléter le formulaire
test('Should fill all the fields of the form', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.locator('input[name="lastname"]').fill('DC');
    await page.locator('input[name="firstname"]').fill('Timéo');

    await page.locator('input[name="ue1"]').fill('16');
    await page.locator('input[name="ue2"]').fill('12');
    await page.locator('input[name="ue3"]').fill('18');
    await page.locator('input[name="ue4"]').fill('13');
    await page.locator('input[name="ue5"]').fill('10');

    await page.locator('select[name="parcours"]').selectOption('dev');

    await page.locator('input[name="portfolio"]').fill('https://mon-portfolio.fr');

    await page.locator('button[type="submit"]').click();

    await expect(page.locator('.banner')).toBeVisible();
});

// Partie 5 - étape 1  data-testid
test('Should submit the form using data-testid selectors', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.locator('[data-testid="lastname"]').fill('DC');
    await page.locator('[data-testid="firstname"]').fill('Timéo');

    await page.locator('[data-testid="ue1"]').fill('16');
    await page.locator('[data-testid="ue2"]').fill('12');
    await page.locator('[data-testid="ue3"]').fill('18');
    await page.locator('[data-testid="ue4"]').fill('13');
    await page.locator('[data-testid="ue5"]').fill('10');

    await page.locator('[data-testid="parcours"]').selectOption('dev');

    await page.locator('[data-testid="portfolio"]').fill('https://mon-portfolio.fr');

    await page.locator('[data-testid="submit"]').click();

    await expect(page.locator('[data-testid="banner"]')).toBeVisible();
});