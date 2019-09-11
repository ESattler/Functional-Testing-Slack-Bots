const rp = require('request-promise');
const { WebClient } = require('@slack/web-api');

async function getDMHistory() {
  const options = {
    method: 'POST',
    json: true,
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
    uri: 'https://slack.com/api/im.history',
    qs: {
      token: '',
      channel: 'DN68ND4JZ',
      count: 1000
    }
  }
  const response = await rp(options);
  return response.messages;
}

async function deleteMessage(ts) {
  const options = {
    method: 'POST',
    json: true,
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
    uri: 'https://slack.com/api/chat.delete',
    qs: {
      token: '',
      channel: 'DN68ND4JZ',
      ts
    }
  }
  await rp(options);
}


async function cleanUp() {
    const history = await getDMHistory();
    for (const message of history) {
      await deleteMessage(message.ts);
    }
}

module.exports = {
    cleanUp
};
