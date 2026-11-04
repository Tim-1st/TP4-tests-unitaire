// @ts-check
import path from "path"
import { test, expect } from "@playwright/test";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Should visit one news on university\'s website', async ({ page }) => {
  await page.goto('https://www.cyu.fr/');
});

// Partie 2 - étape 1 clic sur une actualitée
test('Should click on the first news of the homepage', async ({ page }) => {
    await page.goto('https://www.cyu.fr/');

    const firstNews = page.locator('a[href^="/actualites/"]').first();
    await firstNews.click();
});

// Partie 2 - étape 2.1 vérifier avec getAttribute()
test('Should open the news page matching the link href', async ({ page }) => {
    await page.goto('https://www.cyu.fr/');

    const firstNews = page.locator('a[href^="/actualites/"]').first();
    const href = await firstNews.getAttribute('href');

    await firstNews.click();

    await expect(page).toHaveURL('https://www.cyu.fr' + href);
});

// Partie 2 - étape 2.2 vérification avec une RegEx
test('Should open a page whose URL contains /actualites/', async ({ page }) => {
    await page.goto('https://www.cyu.fr/');

    await page.locator('a[href^="/actualites/"]').first().click();

    await expect(page).toHaveURL(/\/actualites\//);
});

// Partie 3 - étape 1 accéder à Wikipédia
test('Should open the Wikipedia homepage', async ({ page }) => {
    await page.goto('https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal');
});

// Partie 3 - étape 2 recherche avec fill()
test('Should search a word on Wikipedia', async ({ page }) => {
    await page.goto('https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal');

    const searchInput = page.locator('input[name="search"]').first();
    await searchInput.fill('Apple');
    await searchInput.press('Enter');

    // Partie 3 - étape 3 vérifier la page de résultats avec une RegEx
    await expect(page).toHaveURL(/Apple/);
});