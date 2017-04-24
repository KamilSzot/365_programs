var pass = ""

function randomChar(from,to) {
    return String.fromCharCode(Math.floor(Math.random()*(to.charCodeAt(0)-from.charCodeAt(0)+1)+from.charCodeAt(0)));
}

for(var i = 0;i<10;i++) {
    if(Math.random()<.5) {
        pass += randomChar('A', 'Z')
    } else {
        pass += randomChar('0', '9')
        
        
    }
}

console.log(pass)