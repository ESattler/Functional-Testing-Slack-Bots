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
    })

    afterAll(async() => {
      await browser.close();
      await utils.cleanUp();
    })
  
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
})
