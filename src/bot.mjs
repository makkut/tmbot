import TeleBot from "telebot";

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

// bot.on("text", (msg) => msg.reply.text(msg.text));
// bot.on(["/info", "/hello"], (msg) => msg.reply.text("Welcome!"));

// bot.on(/\/info/, function (msg) {
//   return bot.inlineButton("ALISA");
//   //   return bot.sendMessage(
//   //     msg.from.id,
//   //     "Что вас конкретно интересует? Выберите варианты ниже:!!!"
//   //   );
// });

// On commands
bot.on(["/start", "/back"], (msg) => {
  let replyMarkup = bot.keyboard(
    [
      ["/buttons", "/inlineKeyboard"],
      ["/start", "/hide"],
    ],
    { resize: true }
  );

  return bot.sendMessage(msg.from.id, "Keyboard example.", { replyMarkup });
});

// Buttons
bot.on("/buttons", (msg) => {
  let replyMarkup = bot.keyboard(
    [
      [
        bot.button("contact", "Your contact"),
        bot.button("location", "Your location"),
      ],
      ["/back", "/hide"],
    ],
    { resize: true }
  );

  return bot.sendMessage(msg.from.id, "Button example.", { replyMarkup });
});

// Hide keyboard
bot.on("/hide", (msg) => {
  return bot.sendMessage(
    msg.from.id,
    "Hide keyboard example. Type /back to show.",
    { replyMarkup: "hide" }
  );
});

// On location on contact message
bot.on(["location", "contact"], (msg, self) => {
  return bot.sendMessage(msg.from.id, `Thank you for ${self.type}.`);
});

// Inline buttons
bot.on("/inlineKeyboard", (msg) => {
  let replyMarkup = bot.inlineKeyboard([
    [
      bot.inlineButton("callback", { callback: "this_is_data" }),
      bot.inlineButton("inline", { inline: "some query" }),
    ],
    [bot.inlineButton("url", { url: "https://telegram.org" })],
  ]);

  return bot.sendMessage(msg.from.id, "Inline keyboard example.", {
    replyMarkup,
  });
});

bot.on("/invoice", (msg) => {
  return bot.sendInvoice(msg.from.id, {
    title: "alisa",
    description: "alisa maxi",
    payload: "",
    providerToken: process.env.STRIPE_TOKEN,
    startParameter: "string",
    currency: "eur",
    prices: 15,
    photo:
      "https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8xNTQyOWY0YzVhNWQ0YTI3MmU5NmVmZjJjMThiNjEwNz9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.SFvUmetU7jHsMaEa8caZ_lsv_w8Xw2e1OhEOHKYRNR8",
  });
});

// Inline button callback
bot.on("callbackQuery", async (msg) => {
  //   return await bot.sendVideo(
  //     msg.from.id,
  //     "https://yastatic.net/s3/lpc-ext/Alice_website/Chiron/7.12/hero-NY-pc.mp4"
  //   );
  // User message alert
  //   return bot.answerCallbackQuery(
  //     msg.id,
  //     `Inline button callback: ${msg.data}`,
  //     true
  //   );
});

// Inline query
bot.on("inlineQuery", (msg) => {
  const query = msg.query;
  const answers = bot.answerList(msg.id);

  answers.addArticle({
    id: "query",
    title: "Inline Query",
    description: `Your query: ${query}`,
    message_text: "Click!",
  });

  return bot.answerQuery(answers);
});

export default bot;
