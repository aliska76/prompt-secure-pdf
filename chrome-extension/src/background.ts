console.log("Service worker registration starting")

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed!")
})

// Function to save logs to a file
function saveLogsToFile(logs: string) {
  const logBlob = new Blob([logs], { type: 'text/plain' })
  const logURL = URL.createObjectURL(logBlob)

  const logDate = new Date().toLocaleDateString().replace(/\//g, '.')
  const filename = `logs/app_${logDate}.log`
  
  console.log(`Saving log to: ${filename}`)
  
  chrome.downloads.download({
    url: logURL,
    filename: filename,
    saveAs: false, // Automatically save the file without prompting the user
  })

  console.log(`Logs saved to file: ${filename}`)
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message in background:', message)
  //logger.info('Received message in background:', message)
  
  if (message.action === "processFile") {
    const fileContent = message.fileContent

    // Only proceed if there's actual file content
    if (!fileContent) {
      console.log("No file content to process.")
      //logger.info("No file content to process.")
      sendResponse({ error: "No file content to process." })

      return
    }

    // // Keep service worker alive temporarily
    // chrome.alarms.create('processFileAlarm', { delayInMinutes: 0.1 })
    console.log("fileContent ..", fileContent)

    processFile(fileContent).then((result) => {
      sendResponse({ result })
      //logger.info('result 1: ', result)
      //chrome.alarms.clear('processFileAlarm')
    }).catch((error) => {
      console.log("Response error..")
      //logger.error("Response error..")
      sendResponse({ error: error.message })
      //chrome.alarms.clear('processFileAlarm')
    })
  }

  return true
})

async function processFile(fileContent: string) {
  try {
    const response = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'APP-ID': '9d36e6ee-0564-41d6-92f9-bf0da89e3682'
      },
      body: JSON.stringify({ prompt: fileContent })
    })

    const result = await response.json()
    const logMessage = `API Response: ${JSON.stringify(result, null, 2)}`
    console.log(logMessage)

    // Save the log to a file
    saveLogsToFile(logMessage)
    
    return result
  } catch (error) {
    const errorMessage = `Error during file processing: ${error}`
    saveLogsToFile(errorMessage)
    throw new Error('Error during file processing: ' + error)
  }
}

//'{  "prompt": "This is a sample text that may contain a secret like AKIAIOSFODNN7EXAMPLE"}'

//Invoke-WebRequest -Uri "https://stg-ps.prompt.security/api/protect" -Method POST -Headers '@{"APP-ID" = "9d36e6ee-0564-41d6-92f9-bf0da89e3682", "Content-Type" = "application/json"}' -Body '{"prompt": "Test text for secret detection"}'
