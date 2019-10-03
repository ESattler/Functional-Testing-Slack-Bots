const puppeteer = require('puppeteer');
require('expect-puppeteer');
const utils = require('../helper/utils');

let page, browser;
const TIMEOUT = 50000 // 50 seconds

describe('Starter Test', () => {
    beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      page = await browser.newPage();
    });

    afterEach(async () => {
        await utils.cleanUp();
    });

    afterAll(async() => {
      await browser.close();
    });
  
    it('should go to slack workspace and sign in', async () => {
      // Log in
      await page.goto('https://spec-test-conf.slack.com');
      await expect(page).toFill('input[id="email"]', process.env.email, { timeout: TIMEOUT });
      await expect(page).toFill('input[id="password"]', process.env.password, { timeout: TIMEOUT });
      await expect(page).toClick('button[id="signin_btn"]', { timeout: TIMEOUT });

      // Click on Bot in side bar
      await page.waitForSelector('a[data-drag-id="DN68ND4JZ"]', { timeout: TIMEOUT });
      await expect(page).toClick('a[data-drag-id="DN68ND4JZ"]', { timeout: TIMEOUT });
      
      // Verify Page Title
      expect(await page.title()).toBe('Slack | Spec Tester | Spec');
    }, TIMEOUT);

    it('should test /test_button and verify the bot responds properly', async() => {
      // Execute /test_button

      // Click on button

      // Validate Bot response
    });
})