import {test, Page} from '@playwright/test';

async function rejectCookieWall(page:Page) {
    await page.getByRole('button', {name: 'Manage options'}).click();

    const sliderLocatorCollection = page.locator('label > span.fc-preference-slider');
    if(await sliderLocatorCollection.count() === 0)
        return;

    const number = await sliderLocatorCollection.count();

    for (let i = 0; i < number;i++) {
        const sliderLocator = sliderLocatorCollection.nth(i);

        const inputLocator = sliderLocatorCollection.nth(i).locator('input[type=checkbox]');

        if (await inputLocator.isChecked() && await sliderLocator.isVisible())
            await sliderLocator.click()
    }
    await page.getByRole('button', { name: 'Confirm choices' }).click();
}


test('has title', async ({page}) => {
    await page.goto('https://automationexercise.com/category_products');

    await rejectCookieWall(page);

    await page.locator('.productinfo >> nth=0').hover();

});
