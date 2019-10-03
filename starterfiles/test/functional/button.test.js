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
      await page.waitForSelector(`a[data-qa-channel-sidebar-channel-id="${process.env.channel}"]`, { timeout: TIMEOUT });
      await expect(page).toClick(`a[data-qa-channel-sidebar-channel-id="${process.env.channel}"]`, { timeout: TIMEOUT });
      
      // Verify Page Title
      expect(await page.title()).toBe('Slack | Spec Tester | Spec');
    }, TIMEOUT);

    it('should test /test_button and verify the bot responds properly', async() => {
      // Execute /test_button
      await expect(page).toFill('div[data-qa="message_input"]', '/test_button', { timeout: TIMEOUT });
      await page.keyboard.press('Enter');
      await page.keyboard.press('Enter');

      //Validate Button Message Appeared
      await expect(page).toMatch('Here is an example message with a button!', { timeout: TIMEOUT });

      // Click on button
      await expect(page).toClick('button', { text: 'Click Me', timeout: TIMEOUT });

      // Validate Bot response
      await expect(page).toMatch('Good job pressing the button!', { timeout: TIMEOUT });
    });
})
