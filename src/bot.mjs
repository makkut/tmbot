import TeleBot from "telebot";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

// bot.on("text", (msg) => msg.reply.text(msg.text));

bot.onText(/\/info/, function (msg) {
  bot.sendMessage(
    msg.chat.id,
    "Что вас конкретно интересует? Выберите варианты ниже:",
    options
  );
});

export default bot;
