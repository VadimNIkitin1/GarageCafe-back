import TelegramBot from "node-telegram-bot-api";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { prisma } from "./app/prisma.js";

import productRoutes from "./app/product/product.routes.js";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const app = express();

async function main() {
  app.use(express.json());
  app.use(cors());

  const __dirname = path.resolve();

  app.use("/uploads", express.static(path.join(__dirname, "/uploads/")));

  app.use("/api/product", productRoutes);
}

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Ниже можно сделать заказ", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Cделать заказ",
              web_app: { url: process.env.WEB_APP_URL },
            },
          ],
        ],
      },
    });
  }
});

const PORT = process.env.PORT || 4200;

app.listen(
  PORT,
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
