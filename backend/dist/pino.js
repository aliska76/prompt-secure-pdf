"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Format current date for log file name
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
const logDate = formatDate(new Date());
const logDir = path_1.default.join(__dirname, 'logs');
// Ensure logs directory exists
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir);
}
// Define the log format
const logFormat = winston_1.default.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});
// Define transports (console and file)
const transports = [
    // Console transport with colorized output and formatted time
    new winston_1.default.transports.Console({
        level: process.env.LOG_LEVEL || 'info',
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    }),
    // File transport with JSON output
    new winston_1.default.transports.File({
        filename: path_1.default.join(logDir, `app_${logDate}.log`),
        level: 'info',
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json() // Log in JSON format for the file
        ),
    }),
];
// Create the logger instance
const logger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || 'info', // Default log level
    transports,
});
exports.logger = logger;
// Example logs to test
logger.info("Info log");
logger.warn("Warn log");
logger.error("Error log");
