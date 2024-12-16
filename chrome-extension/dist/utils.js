export function decodeRawBytes(bytes) {
    return new TextDecoder("utf-8").decode(bytes);
}
