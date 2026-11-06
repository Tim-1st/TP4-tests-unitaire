// @ts-check
import { test, expect } from "@playwright/test";

// Partie 7 vérification de l'affichage des jours fériés avec une API simulée
test('Should display the holidays list from the API', async ({ page }) => {
   
    await page.route('**/api', async (route) => {
        await route.fulfill({
            json: [
                { date: "25/12/2026", name: "Jour de Noël" },
                { date: "01/01/2027", name: "1er janvier" },
            ],
        });
    });


    const responsePromise = page.waitForResponse('**/api');

    
    await page.goto('http://localhost:3000');
    await responsePromise;

    
    const items = page.locator('[data-holiday-item]');
    await expect(items).toHaveCount(2);
    await expect(items.first()).toContainText('Jour de Noël');
});