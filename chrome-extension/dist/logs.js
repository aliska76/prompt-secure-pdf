import { pino } from 'pino';
// In-memory log storage
let logData = [];
// Format the current date as dd.mm.yyyy
const formatDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
const logDate = formatDate();
export const logger = pino({
    level: 'info',
    hooks: {
        logMethod(inputArgs, method) {
            const level = inputArgs[0];
            const message = inputArgs.slice(1).join(' ');
            const timestamp = new Date().toISOString();
            const formattedLog = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
            logData.push(formattedLog);
            method.apply(this, inputArgs);
        },
    },
});
export const saveLogsToFile = () => {
    const logContent = logData.join('\n');
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const filename = `logs/app_${logDate}.log`;
    chrome.downloads.download({
        url,
        filename,
        saveAs: false
    });
    console.log(`Logs saved to file: ${filename}`);
};
