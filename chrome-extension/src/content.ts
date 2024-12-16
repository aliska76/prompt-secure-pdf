//import { logger } from './pino'

//logger.info('Content script is running!')
console.log('Content script is running!')

// chrome.runtime.sendMessage({ action: 'retrieveLogs' }, (response) => {
//     console.log('Logs from storage:', response.logs)
// })

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'retrieveLogs') {
//         chrome.storage.local.get(['logs'], (result) => {
//             sendResponse({ logs: result.logs || [] })
//         })

//         return true
//     }
// })

document.addEventListener('change', (event) => {
    console.log("fileContent3..")
    const target = event.target as HTMLInputElement

    if (target?.type === 'file' && target.files?.[0]) {
        const file = target.files[0]

        if (file.type === 'application/pdf') {
            const reader = new FileReader()

            reader.onload = () => {
                //logger.info('FileReader onload triggered')
                console.log('FileReader onload triggered')
                const content = reader.result as string

                // Only send message if file content is valid
                if (content) {
                    //logger.info(`content: ${content}`)
                    console.log(`content: ${content}`)
                    chrome.runtime.sendMessage({ action: 'processFile', fileContent: content })
                }
            }

            reader.readAsText(file)
        }
    }
})