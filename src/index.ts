import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_TOKEN, ALLOWED_USERS, SSR_LINKS, CHECK_INTERVAL, HOUR_DURATION } from './config';
import { fetchProjects, Project } from './utils/parser';
import { formatProjectMessage } from './utils/message';
import { isRecent } from './utils/resent';
import { startPingServer } from './utils/ping-server';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

startPingServer();
bot.on('message', (msg) => {
    const userId = msg.from?.id;

    if (!userId || !ALLOWED_USERS.includes(userId)) {
        bot.sendMessage(msg.chat.id, '⛔ У вас немає доступу до бота.');
        console.log(`Відмовлено у доступі користувачу ${userId}`);
        return;
    }

    if (msg.text?.toLowerCase() === '/start') {
        bot.sendMessage(msg.chat.id, '✅ Привіт! Бот запущений і готовий надсилати оновлення з Freelancehunt.');
        console.log(`Користувач ${userId} запустив бота`);
    }
});

async function checkUpdates() {
    console.log('Перевіряємо оновлення...');
    console.log('SSR_LINKS:', SSR_LINKS);

    for (const url of SSR_LINKS) {
        try {
            console.log(`Отримуємо проекти з ${url}`);
            const projects: Project[] = await fetchProjects(url);
            console.log(`Знайдено проєктів: ${projects.length}`);

            const recentProjects = projects.filter(project => {
                const recent = isRecent(project.pubDate, HOUR_DURATION);
                if (!recent) {
                    console.log(`Проєкт відкинуто (старший за 30 хв): ${project.title} - ${project.pubDate}`);
                }
                return recent;
            });

            if (recentProjects.length === 0) {
                console.log('Нових проєктів за останні пів години не має.');
                continue;
            }

            for (const project of recentProjects) {
                const msgText = formatProjectMessage(project);

                for (const userId of ALLOWED_USERS) {
                    try {
                        await bot.sendMessage(userId, msgText, { parse_mode: 'MarkdownV2' });
                        console.log(`Відправлено повідомлення користувачу ${userId}: ${project.title}`);
                    } catch (error) {
                        console.error(`Помилка надсилання повідомлення користувачу ${userId}:`, error);
                    }
                }
            }

        } catch (error) {
            console.error('Помилка при отриманні проектів:', error);
        }
    }
}

checkUpdates();
setInterval(checkUpdates, CHECK_INTERVAL);
