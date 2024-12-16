import { pino } from 'pino';
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
const logDate = formatDate(new Date());
export const logger = pino({
    transport: {
        target: 'pino/file',
        options: {
            mkdir: true,
            colorize: true,
            destination: `${__dirname}/logs/app_${logDate}.log`
        }
    },
    level: process.env.PINO_LOG_LEVEL || 'info'
});
