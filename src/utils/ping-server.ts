import express from 'express';
import axios from 'axios';

export function startPingServer() {
    const app = express();
    const PORT = process.env.PORT || 3000;
    const SELF_URL = process.env.SELF_URL;

    app.get('/', (_req, res) => {
        res.send('Bot is running');
    });

    app.listen(PORT, () => {
        console.log(`Ping server listening on port ${PORT}`);

        if (SELF_URL) {
            setInterval(() => {
                axios.get(SELF_URL).catch(() => {
                });
            }, 14 * 60 * 1000);
            console.log(`Self-ping started: ${SELF_URL}`);
        } else {
            console.warn('SELF_URL is not defined. Self-ping is disabled.');
        }
    });
}
