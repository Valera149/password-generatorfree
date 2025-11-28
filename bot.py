import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup # type: ignore
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes # type: ignore

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /start"""
    keyboard = [
        [InlineKeyboardButton("🔐 Открыть генератор паролей", web_app={'url': 'https://yourdomain.com/index.html'})]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "👋 Добро пожаловать в генератор паролей!\n\n"
        "Нажмите кнопку ниже чтобы открыть генератор безопасных паролей прямо в Telegram.",
        reply_markup=reply_markup
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /help"""
    await update.message.reply_text(
        "ℹ️ **Помощь по генератору паролей**\n\n"
        "• Используйте слайдер для выбора длины пароля\n"
        "• Выбирайте типы символов для включения в пароль\n"
        "• Нажимайте кнопку для копирования пароля\n"
        "• Следите за индикатором сложности\n\n"
        "Для начала работы используйте /start",
        parse_mode='Markdown'
    )

async def web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработка данных из Web App"""
    data = update.effective_message.web_app_data
    logging.info(f"Received web app data: {data.data}")
    
    # Здесь можно обработать данные от фронтенда
    await update.message.reply_text("Данные получены!")

def main():
    """Запуск бота"""
    # Получаем токен из переменных окружения
    TOKEN = os.getenv('7818829268:AAGr2zZl-wHc6e9SJ0kRdtyMkMHj6nyaQB8')
    if not TOKEN:
        raise ValueError("7818829268:AAGr2zZl-wHc6e9SJ0kRdtyMkMHj6nyaQB8")
    
    # Создаем приложение
    application = Application.builder().token(TOKEN).build()
    
    # Добавляем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CallbackQueryHandler(web_app_data))
    
    # Запускаем бота
    application.run_polling()

if __name__ == '__main__':
    main()