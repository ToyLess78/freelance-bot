import { Project } from './parser';

export function escapeMarkdown(text: string): string {
    return text.replace(/([_*\[\]()~`>#+\-=|{}!\\])/g, '\\$1')
        .replace(/\./g, '\\.');
}

export function formatProjectMessage(project: Project): string {
    return `📌 *${escapeMarkdown(project.title)}*\n` +
        `Категорія: _${escapeMarkdown(project.category)}_\n\n` +
        `${escapeMarkdown(project.description)}\n\n` +
        `${escapeMarkdown(project.link.split('?')[0])}`;
}
