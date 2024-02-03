import TeleBot from "telebot";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

// bot.on("text", (msg) => msg.reply.text(msg.text));
bot.on(["/info", "/hello"], (msg) => msg.reply.text("Welcome!"));

export default bot;
