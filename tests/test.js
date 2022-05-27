import { expect, test } from '@playwright/test';

// TARGET gets populated in the .github/workflows/deploy-*.yml
// Be sure to set it to a value to run npm test locally
const baseUrl = '/' + process.env.TARGET.split('/').pop();

// allow clipboard permissions
test.use({
	permissions: ['clipboard-read', 'clipboard-write']
});

test('index page has expected h1', async ({ page }) => {
	await page.goto(baseUrl);
	expect(await page.textContent('h1')).toBe('What is this?');
});

test('search page has expected h1', async ({ page }) => {
	await page.goto(baseUrl + '/search');
	expect(await page.textContent('h1')).toBe('Search');
});

test('dashboard page has expected h1', async ({ page }) => {
	await page.goto(baseUrl + '/dashboard');
	expect(await page.textContent('h1')).toBe('Dashboard');
});

test('search address with some resources press enter expect missing summary', async ({ page }) => {
	await page.goto(baseUrl + '/search');
	await page.fill(
		'#address',
		'addr1qy047pejncekqrqm8qu33hx3sjzpv4vh4lal3ud906qnn44a6vchc2wrqstx29vnzfe58swdae7jczh2hj6kam3nf5zs5gfhan'
	);

	await page.keyboard.press('Enter');

	expect((await page.$$('.results tr')).length === 40);
	expect((await page.$$('.green-check')).length === 26);
	expect((await page.$$('.red-ex')).length === 14);
	expect(await page.textContent('#summary')).toBe('Missing 14 Cardania Resources!');
});

test('search blank address click search expect error', async ({ page }) => {
	await page.goto(baseUrl + '/search');
	await page.click('#search');

	expect(await page.textContent('#error')).toBe('No Cardania Resources found!');
});

test('search address with all resources expect no missing summary', async ({ page }) => {
	await page.goto(baseUrl + '/search');
	await page.fill('#address', 'addr1v86kupvfxyge95pzn09ym2sptet57984cysrdc4dweylhvss9xryw');

	await page.click('#search');

	expect((await page.$$('.results tr')).length === 40);
	expect((await page.$$('.green-check')).length === 40);
	expect(((await page.$$('.red-ex'))?.length ?? 0) === 0);
	expect(await page.textContent('#summary')).toBe('No Cardania Resources missing!');
});

test('check click to copy button', async ({ page }) => {
	await page.goto(baseUrl);

	// read clipboard initially for blank
	const clipboard1 = await page.evaluate(() => navigator.clipboard.readText());
	expect(clipboard1).not.toBeTruthy();

	await page.click('#addressButton');

	const clipboard2 = await page.evaluate(() => navigator.clipboard.readText());

	expect(clipboard2).toBe(
		'addr1qy047pejncekqrqm8qu33hx3sjzpv4vh4lal3ud906qnn44a6vchc2wrqstx29vnzfe58swdae7jczh2hj6kam3nf5zs5gfhan'
	);
});
