import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async({ page }) => {  
  await page.goto('https://dev-tasy.whebdc.com.br/#/login');
  await page.getByRole('textbox', { name: 'User name' }).fill('asimovbr2');
  await page.getByRole('textbox', { name: 'Password' }).fill('tasy12345');
  await page.getByRole('button', { name: 'Login' }).click()

  // Invalid Object popup
  await page.getByRole('alertdialog', { hasText: 'The database has \d{1,} invalid object(s).' }).isEnabled().then( async() => {
    await page.getByRole('button', { name: 'Ok' }).click();
  }).catch( () => {
    console.log('No invalid Object found');
  });

  // Native message popup
  await page.getByRole('button', { name: 'close' }).isEnabled().then( () => {
    page.getByRole('button', { name: 'close' }).click({ timeout: 20000 });
  }).catch( () => {
    console.log('No native messages found');
  });

  // Home page finshed loading
  await expect(page.getByText('FunctionsUtilities')).toBeInViewport();

  await page.context().storageState({ path: authFile });
});