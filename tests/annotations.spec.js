const { test, expect } = require('@playwright/test');

test('It will look for text on title', async ({page}) => {
  await page.goto('https://amazon.com.br/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Tudo pra você, de A a Z/);
});

test.skip('It will ignore this test', async ({page}) => {
  await page.goto('https://www.google.com.br/');

  // Expect a title to be equal to.
  await expect(page).toHaveTitle('Google');
});

test('conditional skip', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Still working on it');

  await page.goto('https://amazon.com.br/');
});

// test.only('It will do only this test', async ({page}) => {
//   await page.goto('https://www.google.com.br/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Google/);
// })

// TAGS sintax:
test('test title', {
  tag: '@fast',
}, async ({ page }) => {
  await page.goto('https://www.google.com.br/');

  // Expect a title to be equal to.
  await expect(page).toHaveTitle('Google');
});

test('test title with tag @slow', async ({ page }) => {
  await page.goto('https://amazon.com.br/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Tudo pra você, de A a Z/);
});

test.fail('this test should fail', async({page}) => {
  await page.goto('https://amazon.com.br/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Google/);
});

test.fixme('this test is marked to be fixed, it wont be executed', async({page}) => {
  await page.goto('https://amazon.com.br/');

  // Incomplete command
  await page.getByRole().click();
});