export function keysmith(key) {
    var numkey = 0;
    for (var i = 0; i < key.length; i++) {
        numkey = numkey + key.charCodeAt(i);
    }
    return numkey % 256;
}

export function encryptor(msg, key) {
    var encrypted = [];
    var numkey = keysmith(key);
    for (var i = 0; i < msg.length; i++) {
        encrypted[i] = msg.charCodeAt(i) + (i + 1) * numkey % 256;
    }
    return encrypted;
}

export function decryptor(encrypted, key) {
    var numkey = keysmith(key);
    var msg = "";
    for (var i = 0; i < encrypted.length; i++) {
        msg = msg + String.fromCharCode(encrypted[i] - (i + 1) * numkey % 256);
    }
    return msg;
}
