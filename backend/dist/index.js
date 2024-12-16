"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const sensetiveDataDetector_1 = require("./sensetiveDataDetector");
const pino_1 = require("./pino");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    pino_1.logger.info("Root endpoint called");
    res.send("Express + TypeScript Server");
});
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appId = req.header("APP-ID");
    const contentType = req.header("Content-Type");
    pino_1.logger.info(`${({ appId, contentType })}, Headers received for POST request`);
    // Validate headers
    if (appId !== "9d36e6ee-0564-41d6-92f9-bf0da89e3682") {
        pino_1.logger.warn("Invalid APP-ID header");
        return res.status(403).json({ error: "Invalid APP-ID header" });
    }
    if (contentType !== "application/json") {
        pino_1.logger.warn("Invalid Content-Type header");
        return res.status(400).json({ error: "Invalid Content-Type header" });
    }
    const { prompt } = req.body;
    // Validate body
    if (!prompt || typeof prompt !== "string") {
        pino_1.logger.error("Invalid or missing prompt in request body");
        return res.status(400).json({ error: "Invalid or missing prompt in request body" });
    }
    try {
        // Check for sensitive data
        const containsSecrets = (0, sensetiveDataDetector_1.processTextForSensitiveData)(prompt);
        pino_1.logger.info(`${containsSecrets}, Sensitive data detection completed`);
        res.status(200).json({ containsSensitiveData: containsSecrets });
    }
    catch (error) {
        pino_1.logger.error(`${error}, Error processing request`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.listen(port, () => {
    pino_1.logger.info(`[server]: Server is running at http://localhost:${port}`);
});
