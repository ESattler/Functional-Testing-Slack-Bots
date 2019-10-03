require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
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

app.post('/test_modal', async (req, res) => {
  const web = new WebClient(process.env.SLACK_AUTH_TOKEN);
  console.log(req.body);
  const options = {
    trigger_id: req.body.trigger_id,
    view: {
      type: 'modal',
      callback_id: 'modal',
      "private_metadata": req.body.channel_id,
      title: {
        type: 'plain_text',
        text: 'My App',
        emoji: true
      },
      submit: {
        type: 'plain_text',
        text: 'Submit',
        emoji: true
      },
      close: {
        type: 'plain_text',
        text: 'Cancel',
        emoji: true
      },
      blocks: [
        {
          type: 'input',
          block_id: 'single_line',
          element: {
            type: 'plain_text_input',
            action_id: 'single_line'
          },
          label: {
            type: 'plain_text',
            text: 'Single Line'
          }
        },
        {
          type: 'input',
          block_id: 'multiline',
          element: {
            type: 'plain_text_input',
            multiline: true,
            action_id: 'multiline'
          },
          label: {
            type: 'plain_text',
            text: 'Multiline',
            emoji: true
          }
        },
        {
          type: 'input',
          block_id: 'select',
          element: {
            type: 'static_select',
            action_id: 'select',
            placeholder: {
              type: 'plain_text',
              text: 'Select an item',
              emoji: true
            },
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: 'Value 0',
                  emoji: true
                },
                value: 'value-0'
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'Value 1',
                  emoji: true
                },
                value: 'value-1'
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'Value 3',
                  emoji: true
                },
                value: 'value-2'
              }
            ]
          },
          label: {
            type: 'plain_text',
            text: 'Select',
            emoji: true
          }
        }
      ]
    }
  }
  await web.views.open(options)
  res.json();
});

app.post('/test_button', async (req, res) => {
  const web = new WebClient(process.env.SLACK_AUTH_TOKEN);
  await web.chat.postMessage({
    text: 'Here is an example message with a button!',
    attachments: [
        {
            text: 'BUTTONS:',
            fallback: 'Something went horribly wrong',
            callback_id: 'button_test',
            color: '#3AA3E3',
            attachment_type: 'default',
            actions: [
                {
                    name: 'button',
                    text: 'Click Me',
                    type: 'button',
                    value: 'foo'
                }
            ]
        }
    ],
    channel: req.body.channel_id,
  });
  res.json();
});


app.post('/interactive', async (req, res) => {
  console.log('test');
  const web = new WebClient(process.env.SLACK_AUTH_TOKEN);
  const payload = JSON.parse(req.body.payload);
  console.log(payload);
  switch (payload.callback_id || payload.view.callback_id) {
    case 'button_test':
      await web.chat.postMessage({
        text: 'Good job pressing the button!',
        channel: payload.channel.id,
      });
      break;
    case 'modal':
      console.log(payload.view.state);
      console.log(payload.view.state.values.select.select);
      await web.chat.postMessage({
        text: `You entered: ${payload.view.state.values.single_line.single_line.value} | ${payload.view.state.values.multiline.multiline.value} | ${payload.view.state.values.select.select.selected_option.text.text}`,
        channel: payload.view.private_metadata,
      });
      break;
    default: 
      console.log('Didn\'t recognize callback ID');
  }
  res.json();
});
