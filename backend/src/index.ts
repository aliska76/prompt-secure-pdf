import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { processTextForSensitiveData } from "./sensetiveDataDetector"
import { logger } from "./winston"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  logger.info("Root endpoint called")
  res.send("Express + TypeScript Server")
})

app.post("/", async (req: Request, res: Response) => {
  const appId = req.header("APP-ID")
  const contentType = req.header("Content-Type")

  logger.info(`${({ appId, contentType })}, Headers received for POST request`)

  // Validate headers
  if (appId !== "9d36e6ee-0564-41d6-92f9-bf0da89e3682") {
    logger.warn("Invalid APP-ID header")
    return res.status(403).json({ error: "Invalid APP-ID header" })
  }

  if (contentType !== "application/json") {
    logger.warn("Invalid Content-Type header")
    return res.status(400).json({ error: "Invalid Content-Type header" })
  }

  const { prompt } = req.body

  // Validate body
  if (!prompt || typeof prompt !== "string") {
    logger.error("Invalid or missing prompt in request body")
    return res.status(400).json({ error: "Invalid or missing prompt in request body" })
  }

  try {
    // Check for sensitive data
    const containsSecrets = processTextForSensitiveData(prompt)
    logger.info(`${containsSecrets}, Sensitive data detection completed`)

    res.status(200).json({ containsSensitiveData: containsSecrets })
  } catch (error) {
    logger.error(`${error}, Error processing request`)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`)
})