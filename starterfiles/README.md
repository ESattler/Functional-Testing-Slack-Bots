# Test Starter Files


 ## 1. Getting Started

To get started, you'll need both the latest versions of `node` and `npm` installed locally. Once you have those installed, clone this repo and navigate to the starterfiles folder. From there, install the npm packages needed to run the tests.
```
npm install
```
This should also take care of installing chromium for you which is needed by puppeteer.

Next, export your email/password to log into the Slack workspace. You will also need to export a slack bot token.
```
export token=xoxb-XXXXX
export email=ENTER_YOUR_NAME
export password=ENTER_YOUR_PASSWORD
```

You will also need to export your channel ID for your DMs with the bot. To do this:

1. Log into the Slack workspace
2. Navigate to the `Apps` Section, type in `Spec Test Bot` and click on Spec Test Bot
3. Next, right click on `Spec Test Bot` under the `Apps` section and copy the link.
4. Paste it into some text field. You should see the URL end with `/messages/XXXXXX`
5. Copy the end string and export it
```
export channel=XXXXX
```

Then, you can run the starter file to validate your environment is set up correctly.
```
npm run test:starter
```

You should see chromium open up, navigate to the Slack sign in page, sign you in and then close the browser. 

## 2. Tests

### a. `slash_command.test.js`

This test will test the bot's `/test_slash_command` slash command. It will log into Slack, open up DM's, execute the slash command and validate the bot's response.

This test is provided to you completed as a reference. It can be executed with

```
npm run test:slash_command
```

### b. `button.test.js`

This is the first test that you should work on completing. Currently it handles logging in and opening up the DMs with the bot. You will need to fill out

- Executing `/test_button` slash command
- Validating the bot's response
- Clicking on the button the bot returns
- Validating the bot's second response

This test can be executed with

```
npm run test:button
```

### c. `modal.test.js`

This is the second test you should complete. Currently it handles logging in and opening up the DMs with the bot. You will need to fill out

- Executing `/test_modal` slash command
- Filling out and submitting the modal that appears
- Validating the bot's response

## 3. Resources

Here are several resources that can help when filling out these tests, as well as just learn more about the libraries you are using

- [Puppeteer](https://github.com/GoogleChrome/puppeteer)
  - [Full API Documentaiton](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)

- [Jest](https://jestjs.io/)

- [Expect-Puppeteer](https://github.com/smooth-code/jest-puppeteer/tree/master/packages/expect-puppeteer)

- [Jest-Puppeteer](https://github.com/smooth-code/jest-puppeteer)
