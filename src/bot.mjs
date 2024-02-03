import TeleBot from "telebot";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

// bot.on("text", (msg) => msg.reply.text(msg.text));

var options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Алиса мини 🟣", callback_data: "1" }],
      [{ text: "Алиса миди 🟠", callback_data: "data 2" }],
      [{ text: "Алиса макси 🟢", callback_data: "text 3" }],
    ],
  }),
};

bot.onText(/\/info/, function (msg) {
  bot.sendMessage(
    msg.chat.id,
    "Что вас конкретно интересует? Выберите варианты ниже:",
    options
  );
});

export default bot;
