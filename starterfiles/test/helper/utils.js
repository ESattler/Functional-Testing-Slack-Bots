const { WebClient } = require('@slack/web-api');

async function getDMHistory() {
  const web = new WebClient(process.env.token);
  const response = await web.im.history({
    channel: 'DN68ND4JZ',
    count: 1000
  });
  return response.messages;
}

async function deleteMessage(ts) {
  const web = new WebClient(process.env.token);
  const response = await web.chat.delete({
    channel: 'DN68ND4JZ',
    ts
  }).catch(e => { });
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
