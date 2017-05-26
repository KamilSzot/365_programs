var msg = "This is a secret message. Zażółć gęślą jaźń.";
var key = 23;
var encoded = "";
var crypt = key;
for(var i=0;i<msg.length;i++) {
    encoded += String.fromCharCode(msg.charCodeAt(i) ^ crypt);
    crypt = (crypt + 1) & 255;
}
console.log(encoded);

var decoded = "";
var crypt = key;
for(var i=0;i<msg.length;i++) {
    decoded += String.fromCharCode(encoded.charCodeAt(i) ^ crypt);
    crypt = (crypt + 1) & 255;
}

console.log(decoded);
