import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:5173/'; //This will have to be changed


test.describe('Chart App - E2E Tests', () => {
  
  test('Chart Generation Verification', async ({ page }) => {
    await page.goto(baseURL);

    await page.waitForLoadState('networkidle');

    // Navigate to the line chart page
    const lineChart = page.getByRole('link', { name: 'Line' });
    await lineChart.click(); 
    
    // Fill in the X and Y labels
    await page.getByLabel('X label').fill('Time');
    await page.getByLabel('Y label').fill('Value');

    // Fill in one (x,y) pair
    await page.getByLabel('X', { exact: true }).fill('1');
    await page.getByLabel('Y', { exact: true }).fill('1');

    // Click on the generate chart button
    const generateButton = page.getByRole('button', { name: 'Generate Chart' });
    await generateButton.waitFor({ state: 'visible', timeout: 5000 });
    await generateButton.click();

    const generatedImage = page.locator('img[alt="Generated chart"]'); 
    await expect(generatedImage).toBeVisible();

  });

  test('Data Persistence Across Pages', async ({ page }) => {
    await page.goto(baseURL);

    await page.waitForLoadState('networkidle');

    // Navigate to the line chart page
    const lineChart = page.getByRole('link', { name: 'Line' });
    await lineChart.click(); 
    
    // Fill in the X and Y labels
    await page.getByLabel('X label').fill('Time');
    await page.getByLabel('Y label').fill('Value');

    // Fill in one (x,y) pair
    await page.getByLabel('X', { exact: true }).fill('1');
    await page.getByLabel('Y', { exact: true }).fill('1');

    // Navigate to scatter chart page
    const scatterChart = page.getByRole('link', { name: 'Scatter' });
    await scatterChart.click();

    // COMMENTING OUT DUE TO WEBSITE MALFUNCTION
    // Check that labels and point is the same
    await expect(page.getByLabel('X label')).toHaveValue('Time');
    await expect(page.getByLabel('Y label')).toHaveValue('Value');
    await expect(page.getByLabel('X', { exact: true })).toHaveValue('1');
    await expect(page.getByLabel('Y', { exact: true })).toHaveValue('1');

  });

  test('Saving Charts to the Gallery', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Navigate to the line chart page
    const lineChart = page.getByRole('link', { name: 'Line' });
    await lineChart.click(); 
    
    // Fill in the X and Y labels
    await page.getByLabel('Chart title').fill('Time Vs. Value');
    await page.getByLabel('X label').fill('Time');
    await page.getByLabel('Y label').fill('Value');

    // Fill in one (x,y) pair
    await page.getByLabel('X', { exact: true }).fill('1');
    await page.getByLabel('Y', { exact: true }).fill('1');

    // Click on the generate chart button
    const generateButton = page.getByRole('button', { name: 'Generate Chart' });
    await generateButton.waitFor({ state: 'visible', timeout: 5000 });
    await generateButton.click();

    // Click on the save chart button
    const saveButton = page.getByRole('button', { name: 'Save Chart' });
    await saveButton.waitFor({ state: 'visible', timeout: 5000 });
    await saveButton.click();

    // Navigate to gallery page
    const galleryPage = page.getByRole('link', { name: 'Gallery' });
    await galleryPage.click(); 

    // Check chart title and type for matching chart
    const chartDiv = page.locator('div').filter({ hasText: 'Time Vs. Value' });
    await expect(chartDiv.getByText('Time Vs. Value')).toHaveText('Time Vs. Value');
    await expect(chartDiv.getByText('Type: line')).toHaveText('Type: line');

  });

  test('Re-opening Saved Charts', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Navigate to the line chart page
    const lineChart = page.getByRole('link', { name: 'Line' });
    await lineChart.click(); 
    
    // Fill in the X and Y labels
    await page.getByLabel('Chart title').fill('Time Vs. Value');
    await page.getByLabel('X label').fill('Time');
    await page.getByLabel('Y label').fill('Value');

    // Fill in one (x,y) pair
    await page.getByLabel('X', { exact: true }).fill('1');
    await page.getByLabel('Y', { exact: true }).fill('1');

    // Click on the generate chart button
    const generateButton = page.getByRole('button', { name: 'Generate Chart' });
    await generateButton.waitFor({ state: 'visible', timeout: 5000 });
    await generateButton.click();

    // Click on the save chart button
    const saveButton = page.getByRole('button', { name: 'Save Chart' });
    await saveButton.waitFor({ state: 'visible', timeout: 5000 });
    await saveButton.click();

    // Navigate to gallery page
    const galleryPage = page.getByRole('link', { name: 'Gallery' });
    await galleryPage.click();

    // Click on open chart button
    const chartDiv = page.locator('div').filter({ hasText: 'Time Vs. Value' });
    const openButton = chartDiv.getByRole('button', { name: 'Open' });
    await openButton.waitFor({ state: 'visible', timeout: 5000 });
    await openButton.click();

    // COMMENTING OUT DUE TO WEBSITE MALFUNCTION
    // Check that the chart data is up
    await expect(page.getByLabel('X label')).toHaveValue('Time');
    await expect(page.getByLabel('Y label')).toHaveValue('Value');
    await expect(page.getByLabel('X', { exact: true })).toHaveValue('1');
    await expect(page.getByLabel('Y', { exact: true })).toHaveValue('1');

    // Check that the chart image is up
    const generatedImage = page.locator('img[alt="Generated chart"]'); 
    await expect(generatedImage).toBeVisible();

  });

});
