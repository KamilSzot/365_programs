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
    return ("0" + Math.floor(n)).slice(-2);
}

class TimeDisplay {
    constructor(public ui:Ui) {};
    update(totalSeconds:number) {
        var seconds = totalSeconds % 60;
        var minutes = totalSeconds / 60 % 60;
        var hours = totalSeconds / 3600;
        ui.controls.display.innerText = `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
    }
}

class Counter {
    value: number = 0;
    constructor(public display:TimeDisplay) {}
    update(delta: number) {
        this.value -= delta;
        if(this.value < 0) {
            this.value = 0;
        }
        this.updateDisplay();
        return this.value == 0;
    }
    onReachedZero: () => void
    set(seconds: number) {
        this.value = seconds;
        this.updateDisplay();
    }
    updateDisplay() {
        this.display.update(Math.round(this.value));
    }
}

class Timer {
    interval: number = undefined;
    startTime: number;
    isPaused() {
        return this.interval == undefined;
    }
    pause() {
        if(!this.isPaused()) {
            var currentTime = this.now();
            clearInterval(this.interval);
            this.interval = undefined;

            if(this.onTimePassed) {
                this.onTimePassed(currentTime - this.startTime);
            }
        }
    }
    resume() {
        if(this.isPaused()) {
            this.startTime = this.now();
            this.interval = setInterval(() => {
                var currentTime = this.now();
                if(this.onTimePassed) {
                    if(this.onTimePassed(currentTime - this.startTime)) {
                        this.pause();
                    }
                }
                this.startTime = currentTime;
            }, 100);
        }        
    }
    onTimePassed: (seconds:number) => void
    now() {
        return new Date().getTime()/1000;
    }
}

var display = new TimeDisplay(ui);
var counter = new Counter(display);
var timer = new Timer();

timer.onTimePassed = (value) => counter.update(value);

counter.set(25*60);

ui.controls.start.onclick = () => {
    counter.set(25*60);    
    timer.resume();
}

ui.controls.pause.onclick = () => {
    timer.pause();
}

ui.controls.resume.onclick = () => {
    timer.resume();
}