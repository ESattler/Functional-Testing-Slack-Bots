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

