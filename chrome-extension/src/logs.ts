import { pino, type Logger } from 'pino'

// In-memory log storage
let logData: string[] = []

// Format the current date as dd.mm.yyyy
const formatDate = (): string => {
  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

const logDate = formatDate()

export const logger: Logger = pino({
  level: 'info',
  hooks: {
    logMethod(inputArgs, method) {
      const level = inputArgs[0]
      const message = inputArgs.slice(1).join(' ')
      const timestamp = new Date().toISOString()
      const formattedLog = `[${timestamp}] [${level.toUpperCase()}] ${message}`

      logData.push(formattedLog)

      method.apply(this, inputArgs)
    },
  },
})

export // Function to save logs to a file
function saveLogsToFile(logs: string) {
  const logBlob = new Blob([logs], { type: 'text/plain' })
  const logURL = URL.createObjectURL(logBlob)

  const logDate = new Date().toLocaleDateString().replace(/\//g, '.')
  const filename = `logs/app_${logDate}.log`

  chrome.downloads.download({
    url: logURL,
    filename: filename,
    saveAs: false, // Automatically save the file without prompting the user
  })

  console.log(`Logs saved to file: ${filename}`)
}