document.addEventListener('DOMContentLoaded', () => {
    const logOutput = document.getElementById('log-output')
  
    chrome.storage.local.get(['logs'], (result) => {
        const logs = result.logs || []

        if (logOutput) {
            logOutput.textContent = logs.join('\n')
        }
    })
  }) 