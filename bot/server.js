require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const { WebClient } = require('@slack/web-api');

// Creates express app
const app = express();
// The port used for Express server
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/test_slash_command', async (req, res) => {
  const web = new WebClient(process.env.SLACK_AUTH_TOKEN);
  await web.chat.postMessage({
    text: 'Hello world!',
    channel: req.body.channel_id,
  });
  res.json();
});

app.post('/test_dialog', async (req, res) => {
  const web = new WebClient(process.env.SLACK_AUTH_TOKEN);
  const options = {
    callback_id: 'dialog',
    title: 'Spec 2019',
    elements: [
      {
          type: 'text',
          label: 'Text Element',
          name: 'text_element'
      },
      {
        type: 'textarea',
        label: 'Textarea Element',
        name: 'textarea_element'
      },
      {
        type: 'select',
        label: 'Select Element',
        name: 'select_element',
        options: [
          {
            label: 'option 1',
            value: 'option_1',
          },
          {
            label: 'option 2',
            label: 'option_2'
          }
        ]
      }
    ]
  }
  await web.dialog.open(options);
  res.json();
});

app.post('/test_button', async (req, res) => {
  const web = new WebClient(process.env.SLACK_AUTH_TOKEN);
  await web.chat.postMessage({
    "text": "Here is an example message with a button!",
    "attachments": [
        {
            "text": "BUTTONS:",
            "fallback": "Something went horribly wrong",
            "callback_id": "button_test",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "button",
                    "text": "Click Me",
                    "type": "button",
                    "value": "foo"
                }
            ]
        }
    ],
    channel: req.body.event.channel,
  });
  res.json();
});


app.post('/interactive', async (req, res) => {
  console.log('test');
  const web = new WebClient(process.env.SLACK_AUTH_TOKEN);
  const payload = JSON.parse(req.body.payload);
  console.log(payload);
  switch (payload.callback_id) {
    case "button_test":
      await web.chat.postMessage({
        text: 'Good job pressing the button!',
        channel: payload.channel.id,
      });
      break;
    default: 
      console.log('Didn\'t recognize callback ID');
  }
  res.json();
});
