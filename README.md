![Application Logo](https://play-lh.googleusercontent.com/5-ek5JhJrdrXMv20nYoBbJwDDFwiRx1rO8Yteee0wZ1xEN8c96RTPyJiosMhtWqZpZo=w240-h480-rw)

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
- Jest: For testing backend logic and server-side components.

## Getting Started
### Prerequisites
- Node.js (v20.18.1): Make sure you have Node.js installed on your machine.
- npm or yarn: Use npm@10.8.2
- Chrome Browser: This extension is designed for Chrome.

### There two separated projects backend and chrome-extension.

## Installation
1. ### Install dependencies:Do this in `backend` and in `chrome-extension` folders separately!
    ```bash
    $ npm install
    ```

2. ### Compile and run the backend
    ```bash
    $ npm run build
    ```
    and then run:
    ```bash
    $ npm run start
    ```

The server should now be running at http://localhost:3000

3. ### Compile and run the chrome-extension
    ```bash
    $ npx webpack
    ```

4. ### Run test in server side
    ```bash
    $ npm run test
    ```
    or
    ```bash
    $ npx jest
    ```

## Load the Chrome Extension:
- Open chrome://extensions/ in your browser.
- Enable Developer mode.
- Click Load unpacked and select the extension directory - `chrome-extension/dist` folder.

## Use the Extension:
- Upload a PDF file to sites like ChatGPT, Gemini, everask.ai and etc. to check if it contains sensitive data.
- If sensitive data is found, an alert will be shown, and the file will be removed from the input field.

## Configuration
- Server URL: Ensure the server is running on `http://localhost:3000`. You can update the server URL in the extension if needed.
- Sensitive Data Detection: The current detection logic checks for common sensitive data patterns such as AWS keys and email addresses. You can modify the processTextForSensitiveData function to add more checks for different types of sensitive data.

## How It Works
1. User Uploads PDF: The user selects a PDF file via the input field in the browser.
2. File is Sent to Server: The extension sends the file (as base64 or form data) to the backend server.
3. Server Processes File: The server extracts text from the PDF and checks for sensitive data.
4. Response Handling: Based on the server's response, the extension either alerts the user and clears the file input or allows the file upload to proceed.

## Troubleshooting
- In a root project directory there is two PDF files you can use to check the usage - one with some sensitive data and one with simple text.
- If the extension doesn't work as expected, check the browser console for any errors.
- Ensure that the server is running on the correct port (http://localhost:3000).
- If sensitive data is not detected, check the server logs to see if the text extraction logic is working properly.

## Limitations
While the PDF Sensitive Data Detector Extension provides useful functionality, there are certain limitations:

- Accuracy of Detection: The extension relies on basic pattern matching for detecting sensitive data (e.g., AWS keys, email addresses). It may not catch all types of sensitive data, and false positives/negatives may occur.
- File Size: There may be limitations on the size of PDF files that can be uploaded due to browser or server restrictions.
- Server Dependency: The extension relies on an external backend server for text extraction and sensitive data detection. If the server is down or unavailable, the extension will not function as expected.
- Supported Formats: Currently, the extension only supports PDF files. Other document formats (e.g., Word, Excel) are not supported.
- Single Server Deployment: The server is currently designed for single-instance deployment. For larger-scale usage, additional deployment strategies (e.g., load balancing) are required.

## Features/Requirements for Production Readiness
To make the PDF Sensitive Data Detector Extension production-ready, the following features and requirements need to be addressed:

1. Improved Sensitive Data Detection:
    - Add more data patterns (e.g., credit card numbers, passwords).
    - Use machine learning models or advanced heuristics for better detection.
2. Scalability:
    - Implement support for horizontal scaling of the backend server to handle a large number of requests concurrently.
    - Add support for load balancing and caching to improve the performance of the backend.
3. Error Handling and Logging:
    - Improve error handling to provide more detailed user feedback when sensitive data is detected or other issues occur.
    - Implement a more robust logging system on both the frontend and backend to help with debugging and analytics.
4. User Interface:
    - Enhance the user interface of the extension with better notifications and guidance for users.
    - Provide feedback on the status of the PDF upload and sensitive data scanning process (e.g., loading spinner).
5. Security:
    - Encrypt files during upload and processing to ensure sensitive data is protected.
    - Ensure that the server only processes files from trusted sources to prevent malicious file uploads.
6. Multi-File Upload:
    - Enable the extension to handle multiple PDF uploads at once.
7. Cross-Browser Compatibility:
    - Ensure the extension works in all major browsers (e.g., Firefox, Edge) for broader user adoption.

## Performance Improvement Ideas for Large Scale
For supporting large-scale use, here are a few performance improvement ideas:

1. Optimize PDF Text Extraction:
    - The current text extraction logic can be slow, especially for large or complex PDF files. Consider optimizing the algorithm, or using a more efficient text extraction library, potentially leveraging parallel processing or streaming.
2. Asynchronous Processing:
    - Allow file processing to be done asynchronously. For large files, it would be beneficial to process the file in chunks rather than in one go, reducing the load on both the server and the browser.
3. Caching and Indexing:
    - Cache processed PDF files to avoid re-processing the same file repeatedly.
    - Implement file hashing and indexing on the server to quickly detect previously analyzed documents.
4. Scaling the Backend:
    - Use cloud-based solutions (e.g., AWS, Google Cloud) to scale the backend service horizontally. Implement auto-scaling to handle spikes in traffic efficiently.
    - Introduce a message queue system (e.g., RabbitMQ, Kafka) to manage file processing asynchronously in the backend.
5. Serverless Architecture:
    - Consider using a serverless architecture for the backend to handle unpredictable traffic spikes, while reducing infrastructure maintenance.
6. Rate Limiting:
    - Implement rate limiting to protect the server from being overwhelmed with too many requests in a short period of time.
7. Database Optimization:
    - Optimize database queries and storage solutions for efficient handling of large datasets, especially when dealing with logs or tracking previously processed files.

## License
This project is licensed under the ISC License.
