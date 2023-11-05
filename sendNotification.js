const TelegramBot = require('node-telegram-bot-api');

const sendNotification = async (message) => {
  console.log('Sending notification', {
    chatId: process.env.TELEGRAM_CHAT_ID,
    token: process.env.TELEGRAM_BOT_TOKEN,
  });
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
        polling: false
    });

    const chatId = process.env.TELEGRAM_CHAT_ID;

    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML'
    });

};

module.exports = sendNotification;