"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTextForSensitiveData = exports.containsSensitiveData = void 0;
const sensitivePatterns = [
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, // Email
    /\b\d{3}-\d{2}-\d{4}\b/, // SSN or similar patterns
    /\bey[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\b/, // JWT
    /\bpassword[:=]\s*\w+/i, // Password patterns
    /\b(?:\d[ -]*?){13,16}\b/, // Credit card-like patterns
    /\bAKIA[A-Z0-9]{16}\b/, // AWS Access Key
    /\b[\w!#$%&()*+,-./:<=>?@[\\\]^_`{|}~]{6,22}\b/, // Improved Password pattern (includes special chars)
    /\bxoxe-\d-[A-Z0-9]{146}/i, // Match xoxe-based secrets
    /\bperm:([a-zA-Z=.0-9]{96}|[a-zA-Z=.0-9]{64})/ // Match "perm:" prefixed secrets
];
const containsSensitiveData = (text) => {
    for (const pattern of sensitivePatterns) {
        if (pattern.test(text))
            return true;
    }
    return false;
};
exports.containsSensitiveData = containsSensitiveData;
// Main function to process paragraphs
const processTextForSensitiveData = (largeText) => {
    const paragraphs = largeText.split('\n'); // Split large text into paragraphs
    let sensitiveParagraphFound = false;
    for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        // Check for sensitive data in the paragraph
        if ((0, exports.containsSensitiveData)(paragraph)) {
            console.log(`Sensitive data found in paragraph ${i + 1}: ${paragraph}`);
            sensitiveParagraphFound = true;
            break; // Stop the loop as sensitive data is found
        }
    }
    if (!sensitiveParagraphFound) {
        console.log("No sensitive data found in the provided text.");
    }
    return sensitiveParagraphFound;
};
exports.processTextForSensitiveData = processTextForSensitiveData;
