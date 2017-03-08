require('./css/app.css')

import * as React from 'react'
import * as ReactDOM from 'react-dom'

type Four = {
        x: number,
        y: number,
        x2: number,
        y2: number
    };
class Image {
    constructor(public sgn:Four, public fct:Four) {

    }
    draw(ctx: CanvasRenderingContext2D) {
        var r = 250;
        var n = 360;
        var p = [ new Path2D(), new Path2D(), new Path2D() ]
        for(var i = 0; i<=n; i++) {
            var a = 2*Math.PI*i/n;
            var pt = {
                x: r+this.sgn.x*r*Math.sin(this.fct.x*a),
                y: r+this.sgn.y*r*Math.cos(this.fct.y*a),
                x2: r+this.sgn.x2*r*Math.sin(this.fct.x2*a),
                y2: r+this.sgn.y2*r*Math.cos(this.fct.y2*a),                
            }
            p[0].moveTo(pt.x, pt.y);
            p[0].lineTo(pt.x2, pt.y2);

            if(i==0) {            
                 p[1].moveTo(pt.x, pt.y);
            } else {
                 p[1].lineTo(pt.x, pt.y);
            }
            if(i==0) {            
                 p[2].moveTo(pt.x2, pt.y2);
            } else {
                 p[2].lineTo(pt.x2, pt.y2);
            }
        }
        p.forEach((p)=>ctx.stroke(p));
    }
}
var imgs = [
    new Image({
        x: -1,
        y: -1,
        x2: -1,
        y2: -1
    },
    {
        x: 3,
        y: 5,
        x2: 4,
        y2: 3
    }),
    new Image({
        x: 1,
        y: 1,
        x2: -1,
        y2: -1
    },
    {
        x: 3,
        y: 5,
        x2: 4,
        y2: 3
    })
];

class App extends React.Component<{}, {imgNo: number }> {
    state = { imgNo: 0 }
    componentDidMount() {
        var canvas = this.refs.canvas as HTMLCanvasElement;
        var ctx = canvas.getContext("2d");

        imgs[0].draw(ctx);
    }
    switch = () => {
        this.setState({ imgNo: 1-this.state.imgNo });
    }
    componentDidUpdate(prevProps:{}, prevState:{imgNo: number}) {
        var canvas = this.refs.canvas as HTMLCanvasElement;
        var ctx = canvas.getContext("2d");

        ctx.clearRect(0,0,500,500);
        imgs[this.state.imgNo].draw(ctx);
        
    }
    render() {
        return <canvas width="500" height="500" ref="canvas" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} onClick={this.switch}>
        </canvas>;
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

console.log('app running')

