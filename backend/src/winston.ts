import winston from 'winston'
import fs from 'fs'
import path from 'path'

// Format current date for log file name
const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
}

const logDate = formatDate(new Date())
const logDir = path.join(__dirname, 'logs')

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

const logFormat = winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`
})

const transports = [
    // Console transport with colorized output and formatted time
    new winston.transports.Console({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat
        )
    }),

    new winston.transports.File({
        filename: path.join(logDir, `app_${logDate}.log`),
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        )
    })
]

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports
})