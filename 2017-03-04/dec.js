function dbg(target, key, descriptor) {

    console.log(arguments);
}

function clsdbg(target) {

    console.log(arguments);
}

@clsdbg
class Test {
    @dbg
    hi() { console.log("hi"); }
    @dbg
    get q() {
        return 2
    }
    constructor() {
        this.a = 1
    }
}