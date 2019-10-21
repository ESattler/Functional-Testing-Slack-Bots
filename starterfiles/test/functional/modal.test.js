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
        slowMo: 50
      });
      page = await browser.newPage();
    });

    afterEach(async () => {
        await utils.cleanUp();
    });

    afterAll(async() => {
      await browser.close();
    });
  
    it('should be titled "Slack | Spec Test Bot | Slack Community" after logging in and opening DMs', async () => {
      // Log in
      await page.goto('https://community.slack.com');
      await expect(page).toFill('input[id="email"]', process.env.email, { timeout: TIMEOUT });
      await expect(page).toFill('input[id="password"]', process.env.password, { timeout: TIMEOUT });
      await expect(page).toClick('button[id="signin_btn"]', { timeout: TIMEOUT });

      // Click on Bot in side bar
      await page.waitForSelector(`a[data-qa-channel-sidebar-channel-id="${process.env.channel}"]`, { timeout: TIMEOUT });
      await expect(page).toClick(`a[data-qa-channel-sidebar-channel-id="${process.env.channel}"]`, { timeout: TIMEOUT });
      
      // Verify Page Title
      expect(await page.title()).toBe('Slack | Spec Test Bot | Slack Community');
    }, TIMEOUT);

    it('should return modal inputs after running /test_modal, filling it out and submitting', async() => {
      // Execute /test_modal

      // Fill in modal elements

      // Submit Modal

      // Validate Bot response

    });
})
