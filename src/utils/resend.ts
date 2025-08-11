export function isRecent(pubDateString: string, durationMs: number): boolean {
    const pubDate = new Date(pubDateString);

    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const kyivTime = new Date(utc + 3 * 60 * 60 * 1000);

    const threshold = new Date(kyivTime.getTime() - durationMs);

    return pubDate >= threshold;
}
