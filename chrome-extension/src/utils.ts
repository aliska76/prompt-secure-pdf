export function decodeRawBytes(bytes: ArrayBuffer): string {
    return new TextDecoder("utf-8").decode(bytes)
}  