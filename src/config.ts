import 'dotenv/config';

export const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN!;
export const ALLOWED_USERS = process.env.ALLOWED_USERS!.split(',').map(Number);
export const SKILLS = process.env.SKILLS!.split(',').map(Number);

export const SSR_LINKS = SKILLS.map(
    skillId => `https://freelancehunt.com/project/skill/${skillId}.rss`
);

export const CHECK_INTERVAL = Number(process.env.CHECK_INTERVAL);
export const HOUR_DURATION = Number(process.env.HOUR_DURATION);
