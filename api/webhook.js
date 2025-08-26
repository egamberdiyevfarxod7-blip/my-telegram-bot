// api/webhook.js
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN, { handlerTimeout: 9000 });

// Простые ответы
bot.start((ctx) => ctx.reply('Привет! Бот запущен на Vercel.'));
bot.on('text', (ctx) => ctx.reply(`Вы написали: ${ctx.message.text}`));

// Обработчик для Vercel
export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).send('OK');
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  try {
    await bot.handleUpdate(req.body);
    res.status(200).end();
  } catch (err) {
    console.error('Bot error:', err);
    res.status(500).send('Error');
  }
}
