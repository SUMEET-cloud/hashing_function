const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes} = require("ethereum-cryptography/utils");
const { hexToByte, bytesToBase64 } = require("./conversion")
const { base64ToBytes } = require("byte-base64")


function hashMessage(input, input_type, output_type) {
    console.log("Input String:", input);
    
    let bytes;
    
    switch (input_type) {
        case 'hex': bytes = hexToByte(input); break;
        case 'base64': bytes = base64ToBytes(input); break
        case 'utf8': bytes = utf8ToBytes(input); break
        default: {
            console.error("Unsupported input_type: {}", input_type)
            return;
        }
    }
    
    const hashBytes = keccak256(bytes); 

    switch (output_type) {
        case 'hex': return toHex(hashBytes)
        case 'base64': return bytesToBase64(hashBytes)
        default: {
            console.error("Unsupported output_type: {}", output_type)
            return;
        }
    }
}

// Example usage:
console.log("Keccak hash from utf8 to hex: {}", hashMessage("Test message",'utf8','hex'));  //Ok
console.log("Keccak hash from utf8 to base64: {}", hashMessage("Test message", 'utf8', 'base64'));  //Ok
console.log("Keccak hash from hex to hex: {}", hashMessage("2c1eaede95d78fe381ea", 'hex', 'hex')); //Ok
console.log("Keccak hash from base64 to base64: {}", hashMessage("TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcmsu", 'base64', 'base64')); 
console.log("Keccak hash from base64 to hex: {}", hashMessage("TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcmsu", 'base64', 'hex')); 
console.log("Keccak hash from hex to base64: {}", hashMessage("2c1eaede95d78fe381ea", 'hex', 'base64')); //Ok