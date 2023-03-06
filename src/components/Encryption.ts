//Helper function used in both decrypt and encrypt
export function keysmith(key: string): number {
    let numkey = 0;
    for (let i = 0; i < key.length; i++) {
        numkey = numkey + key.charCodeAt(i);
    }
    return numkey % 256;
}

/**
 * Encrypts a string and return the encrypted string in the form of an array
 *
 * @paras {string} msg -the string to be encrypted
 * @param {string} key -the key used to encrypt the message
 * @returns  {array} -An array of numbers representing the encrypted string
 *
 * @example encrypt("hej", "apa") returns [ 154, 201, 256 ]
 ***/
export function encrypt(msg: string, key: string): Array<number> {
    let encrypted: Array<number> = [];
    const numkey = keysmith(key);
    for (let i = 0; i < msg.length; i++) {
        encrypted[i] = msg.charCodeAt(i) + (i + 1) * numkey % 256;
    }

    return encrypted
}

/**
 * Encrypts a string and return the encrypted string in the form of an array
 *
 * @param {Array<numbers>} encrypted -the string to be encrypted
 * @param  {string} key -the key used to decrypt the message
 * @returns  {string} -the decrypted string
 *
 * @example decrypt( [ 154, 201, 256 ], "apa") returns "hej"
 ***/
export function decrypt(encrypted: Array<number>, key: string): string {
    const numkey = keysmith(key);
    let msg = ""
    for (let i = 0; i < encrypted.length; i++) {
        msg = msg + String.fromCharCode(encrypted[i] - (i + 1) * numkey % 256) ;
    }
    return msg;
}

console.log(encrypt("hej", "apa"));
console.log(decrypt([ 154, 201, 256 ], "apa"));