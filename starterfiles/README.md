# Test Starter Files


 ## 1. Getting Started

To get started, you'll need both the latest versions of `node` and `npm` installed locally. Once you have those installed, clone this repo and navigate to the starterfiles folder. From there, install the npm packages needed to run the tests.
```
npm install
```
This should also take care of installing chromium for you which is needed by puppeteer.

Next, export your email/password to log into the Slack workspace.
```
export email=ENTER_YOUR_NAME
export password=ENTER_YOUR_PASSWORD
```

Then, you can run the starter file to validate your environment is set up correctly.
```
npm run test:starter
```

You should see chromium open up, navigate to the Slack sign in page, sign you in and then close the browser. 

