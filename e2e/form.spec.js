// @ts-check
import { test, expect } from "@playwright/test";

// Partie 4 - étape 1 accéder au site local
test('Should open the form page', async ({ page }) => {
    await page.goto('http://localhost:3000');
});