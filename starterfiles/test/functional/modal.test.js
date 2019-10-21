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
      await expect(page).toFill('div[data-qa="message_input"]', '/test_modal', { timeout: TIMEOUT });
      await page.keyboard.press('Enter');
      await page.keyboard.press('Enter');

      // Fill in modal elements
      await expect(page).toFill('input[id="single_line-single_line"]', 'First', { timeout: TIMEOUT });
      await expect(page).toFill('textarea[id="multiline-multiline"]', 'Second', { timeout: TIMEOUT });

      await page.keyboard.press('Tab');
      await page.keyboard.type('Value 0')
      await page.keyboard.press('Enter');

      // Submit Modal
      await expect(page).toClick('button', { text: 'Submit', timeout: TIMEOUT });

      // Validate Bot response
      await expect(page).toMatch('You entered: First | Second | Value 0', { timeout: TIMEOUT });

    });
})
