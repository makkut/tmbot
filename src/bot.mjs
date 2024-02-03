import TeleBot from "telebot";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

// bot.on("text", (msg) => msg.reply.text(msg.text));
// bot.on(["/info", "/hello"], (msg) => msg.reply.text("Welcome!"));

var options = {
  replyMarkup: JSON.stringify({
    inlineKeyboard: [
      [{ text: "Алиса мини 🟣", callbackData: "1" }],
      [{ text: "Алиса миди 🟠", callbackData: "data 2" }],
      [{ text: "Алиса макси 🟢", callbackData: "text 3" }],
    ],
  }),
};

bot.on(/\/info/, function (msg) {
  return bot.sendMessage(
    msg.from.id,
    "Что вас конкретно интересует? Выберите варианты ниже:",
    options
  );
});

export default bot;
