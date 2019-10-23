# Test Starter Files


 ## 1. Getting Started

To get started, you'll need both the latest versions of `node` and `npm` installed locally. Once you have those installed, clone this repo and navigate to the starterfiles folder. From there, install the npm packages needed to run the tests.
```
npm install
```
This should also take care of installing Chromium for you which is needed by puppeteer.

Next, we'll need to set up some environment variables needed for the tests. You will need to update the `.env` file:
```
email=
password=
token=
channel=
```

Let's go through what these environment variables are for.

- `email` & `password`
  - This should be your actual login to the [Slack Community workspace](https://community.slack.com)
    - **NOTE**: For the sake of this workshop, we are using our own actual account information. When actually implementing this with your own personal bots, the best practice would be to create a "service account" and use those credentials.
- `token`
  - This needs to be the bot token (xoxb-XXXX) for the bot we are testing against
  - For this workshop, the bot token will be provided for you in the `#workshop-for-functional-testing`
  - If you don't have access to the bot token, this will break the functionality of the `cleanUp` function, you can comment this out. Do note, cleaning up the DMs is important so consecutive runs don't give false positive for tests passing. You can manually delete the messages in your DM history with the bot.

- `channel`
  - The channel should be the channel ID for your DMs with the bot. You can get this by:
    -  Log into the [Slack Community workspace](https://community.slack.com)
    - Navigate to the `Apps` Section, type in `Spec Test Bot` and click on Spec Test Bot
      - You can also search `Direct Messages` and start your direct message with the bot
    - Next, right click on `Spec Test Bot` under the `Apps` section and copy the link.
    - Paste it into some text field. You should see the URL end with `/messages/XXXXXX`
    - Copy the end string and add it the .env file `token=XXXXXX`

Then, you can run the starter file to validate your environment is set up correctly.
```
npm run test:starter
```

You should see chromium open up, navigate to the Slack sign in page, sign you in and then close the browser.

If you are running this behind a proxy, you may see the test pass but hang forever. This is because the `cleanUp` function calls Slack APIs which might get stuck if it can't get through your proxy.

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
