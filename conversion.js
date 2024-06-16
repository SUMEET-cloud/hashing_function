const { Buffer } = require('buffer');

function hexToByte(hex) {
    const key = '0123456789abcdef'
    let newBytes = []
    let currentChar = 0
    let currentByte = 0
    for (let i = 0; i < hex.length; i++) {   
        currentChar = key.indexOf(hex[i])
        if (i % 2 === 0) { 
            currentByte = (currentChar << 4) 
        }
        if (i % 2 === 1) { 
            currentByte += (currentChar)   
            newBytes.push(currentByte)       
        }
    }
    return new Uint8Array(newBytes);
};

function base64ToBytes(base64_string) {
    return Uint8Array.from(atob(base64_string), c => c.charCodeAt(0))
}

function bytesToBase64(bytes) {
    const buffer = Buffer.from(bytes);
    return buffer.toString('base64');
}



module.exports = {
    hexToByte: hexToByte,
    base64ToBytes: base64ToBytes,
    bytesToBase64: bytesToBase64
};