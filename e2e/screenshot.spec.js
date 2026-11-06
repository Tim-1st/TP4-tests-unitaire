// @ts-check
import { test, expect } from "@playwright/test";

// Partie 8 - étape 1 capture d'écran d'un site
test('Should take a screenshot of a website', async ({ page }) => {
    await page.goto('https://www.apple.com/fr/');

    await page.screenshot({ path: 'screenshots/apple.png' });
});

// Partie 8 - étape 2 captures mobile, tablette et PC
test('Should take mobile, tablet and desktop screenshots', async ({ page }) => {
    await page.goto('https://www.cyu.fr/');

    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'screenshots/cyu-mobile.png' });

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ path: 'screenshots/cyu-tablette.png' });

    await page.setViewportSize({ width: 1366, height: 768 });
    await page.screenshot({ path: 'screenshots/cyu-pc.png' });
});

// Partie 8 - étape 4 vérification du cookie créé à l'envoi du formulaire
test('Should create a cookie when the form is submitted', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.locator('[data-testid="lastname"]').fill('DC');
    await page.locator('[data-testid="firstname"]').fill('Timéo');

    await page.locator('[data-testid="ue1"]').fill('16');
    await page.locator('[data-testid="ue2"]').fill('12');
    await page.locator('[data-testid="ue3"]').fill('18');
    await page.locator('[data-testid="ue4"]').fill('13');
    await page.locator('[data-testid="ue5"]').fill('10');

    await page.locator('[data-testid="parcours"]').selectOption('dev');

    await page.locator('[data-testid="submit"]').click();
    await expect(page.locator('[data-testid="banner"]')).toBeVisible();

    const listCookies = await page.context().cookies();
    const cookie = listCookies.find(item => item.name === "parcours");

    expect(cookie.value).toBe('dev');
});