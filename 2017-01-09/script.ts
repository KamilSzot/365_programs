class Ui {
    controls = {
        display: HTMLElement = undefined,
        start: HTMLElement = undefined,
        pause: HTMLElement = undefined,
        resume: HTMLElement = undefined 
    }
    constructor() {
        for(var id in this.controls) {
            this.controls[id] = document.getElementById(id);
        }
    }
}
var ui = new Ui();

function zeroPad(n:number) {
    return ("0" + n).slice(-2);
}

var timer = new class {
    startTime: number;
    secondsLeft = 25*60;
    interval = null;
    start() {
        if(this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.secondsLeft = 25*60;
        this.resume();
    };
    pause() {
        if(this.interval) {
            this.secondsLeft -= (new Date().getTime() - this.startTime)/1000;
            clearInterval(this.interval);
            this.interval = null;
        }
    };
    resume() {
        if(!this.interval) {
            this.startTime = new Date().getTime();
            this.interval = setInterval(() => this.updateTime(), 100);        
        }
    };
    updateTime() {
        var delta = this.secondsLeft - Math.floor((new Date().getTime() - this.startTime)/1000); 
        var seconds = Math.floor(delta % 60);
        var minutes = Math.floor(delta / 60) % 60;
        var hours = Math.floor(delta / 3600);

        ui.controls.display.innerText = `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
    }    
}


ui.controls.start.onclick = () =>
    timer.start();

ui.controls.pause.onclick = () =>
    timer.pause();

ui.controls.resume.onclick = () =>
    timer.resume();