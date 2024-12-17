
# PDF Sensitive Data Detector Extension
## Description
This project is a Chrome Extension designed to detect sensitive data (like AWS keys, email addresses, etc.) in PDF files before they are uploaded. The extension processes PDF files and checks for sensitive data by sending the files to a server-side API. If sensitive data is detected, the user is alerted and prevented from uploading the file. If no sensitive data is found, the user can proceed with the file upload.

## Features
- PDF File Upload: The extension allows users to upload PDF files.
- Sensitive Data Detection: The extension checks the content of the uploaded PDF files for sensitive data (e.g., AWS keys, emails).
- Alert on Sensitive Data: If sensitive data is detected, the user will be shown an alert with a warning message.
- File Removal on Alert: If sensitive data is detected, the file input will be cleared, preventing the file from being uploaded.

## Technologies Used
- Chrome Extension API: For interacting with the browser's functionality.
- JavaScript / TypeScript: For the main logic of the extension.
- Node.js / Express: For the server-side functionality to handle PDF text extraction and sensitive data detection.
- FileReader API: For reading PDF files in the browser.
- FormData API: For sending files to the server for processing.
- FormData API: For sending files to the server for processing.
- Webpack: Used for bundling the extension and optimizing assets.
- Winston: Used for logging on the server, with logs stored in the dist/logs folder.
- pdf-ts: Library used for extracting text from PDF files on the server.

## Getting Started
### Prerequisites
- Node.js (v20.18.1): Make sure you have Node.js installed on your machine.
- npm or yarn: Use npm@10.8.2
- Chrome Browser: This extension is designed for Chrome.

There two separated projects backend and chrome-extension.

### Installation
Do this in backend and in chrome-extension folders separately!

```bash
$ npm install
```

## Compile and run the backend
```bash
$ npm run build
```

```bash
$ npm run start
```

The server should now be running at http://localhost:3000

## Compile and run the chrome-extension
```bash
$ npx webpack
```

## Load the Chrome Extension:
- Open chrome://extensions/ in your browser.
- Enable Developer mode.
- Click Load unpacked and select the extension directory (chrome-extension/dist folder).

## Use the Extension:
- Upload a PDF file to sites like ChatGPT, Gemini, everask.ai and etc. to check if it contains sensitive data.
- If sensitive data is found, an alert will be shown, and the file will be removed from the input field.

## Configuration
- Server URL: Ensure the server is running on http://localhost:3000. You can update the server URL in the extension if needed.
- Sensitive Data Detection: The current detection logic checks for common sensitive data patterns such as AWS keys and email addresses. You can modify the processTextForSensitiveData function to add more checks for different types of sensitive data.

## How It Works
1. User Uploads PDF: The user selects a PDF file via the input field in the browser.
2. File is Sent to Server: The extension sends the file (as base64 or form data) to the backend server.
3. Server Processes File: The server extracts text from the PDF and checks for sensitive data.
4. Response Handling: Based on the server's response, the extension either alerts the user and clears the file input or allows the file upload to proceed.

## Troubleshooting
- If the extension doesn't work as expected, check the browser console for any errors.
- Ensure that the server is running on the correct port (http://localhost:3000).
- If sensitive data is not detected, check the server logs to see if the text extraction logic is working properly.

## License
This project is licensed under the ISC License.
