export function isRecent(pubDateString: string, durationMs: number): boolean {
    const pubDate = new Date(pubDateString);
    const now = new Date();

    const threshold = new Date(now.getTime() - durationMs);

    console.log(`Порівняння часу:
        pubDate: ${pubDate.toISOString()}
        threshold: ${threshold.toISOString()}
        now: ${now.toISOString()}
        isRecent: ${pubDate >= threshold}`);

    return pubDate >= threshold;
}
