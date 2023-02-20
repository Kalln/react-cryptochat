export function keysmith(key: string): number {
    let numkey = 0;
    for (let i = 0; i < key.length; i++) {
        numkey = numkey + key.charCodeAt(i);
    }
    return numkey % 256;
}

export function encryptor(msg: string, key: string): Array<number> {
    let encrypted: Array<number> = [];
    const numkey = keysmith(key);
    for (let i = 0; i < msg.length; i++) {
        encrypted[i] = msg.charCodeAt(i) + (i + 1) * numkey % 256;
    }

    return encrypted
}

export function decryptor(encrypted: Array<number>, key: string): string {
    const numkey = keysmith(key);
    let msg = ""
    for (let i = 0; i < encrypted.length; i++) {
        msg = msg + String.fromCharCode(encrypted[i] - (i + 1) * numkey % 256);
    }
    return msg;
}