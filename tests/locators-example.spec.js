const { test, expect } = require('@playwright/test');

test.beforeEach(async ({page}) => {
  await page.goto('https://vv-fixa10-unicode.wheb.com.br/#/login');
});

//Other locators: https://playwright.dev/docs/other-locators
test('Not optimal locators', async({page}) => {
  //tag by name
  await page.locator('input').first().click();

  //by ID
  await page.locator('#loginUsername').click();

  //by Class value
  await page.locator('.w-login-form__field').first().click();

  //by Class value(full)
  await page.locator('[class="w-login-form__field ng-pristine ng-untouched ng-valid"]').first().click();

  //by Attribute
  await page.locator('[ng-model="username"]').first().click();

  //combine with different selectors
  await page.locator('input[ng-model="username"][placeholder="User name"]').first().click();
  
  //by XPath (not recommended by playwright)
  await page.locator('//*[@id="loginUsername"]').click();

  //by partial text match
  await page.locator(':text("Forgot")').first().click();

  //by exact text match
  await page.locator(':text-is("For evaluation purposes only")').click();
})

//Best practices: https://playwright.dev/docs/best-practices
//All Locators: https://playwright.dev/docs/locators
test('User facing locators (optimal)', async({page}) => {

  await page.getByRole('textbox', { name: 'User name' }).click();

  await page.getByRole('textbox', { name: 'Password' }).click();

  await page.getByAltText('Philips logo').click();

  await page.getByText('Cookies Notice').click();

  await page.getByRole('button', { name: 'Close' }).isEnabled().then( async() => {
    await page.getByRole('button', { name: 'Close' }).click();
  });
});
