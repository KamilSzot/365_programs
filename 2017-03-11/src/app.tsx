require('./css/app.css')

import * as React from 'react'
import * as ReactDOM from 'react-dom'

var circle:Droplets;

class Droplets extends React.Component<{}, { r: number, d: number, a:number, x:number, y:number }> {
    state = {r:0, d:0, a:0, x:250, y:250}
    componentDidMount() {
        circle = this;
    }
    render() {
        var [ w, h ] = [500, 500];
        var {r, d, a, x, y} = this.state;

        return <svg width={w} height={h} style={{border: '1px solid black'}}>
            <defs>
                <mask id="hole">
                    <rect x={x-r} y={y-r} width={2*r} height={2*r} fill="white" />
                    <circle cx={x} cy={y} r={r-d} fill="black" />
                    <filter id="blur-effect-1">
                        <feGaussianBlur stdDeviation="2" />
                    </filter>
                </mask>
            </defs>
            <g  filter="url(#blur-effect-1)" style={{ opacity: a }}>
                <circle cx={x} cy={y} r={r} mask="url(#hole)" />
            </g>
           
        </svg>;
    }
}

ReactDOM.render(<Droplets />, document.getElementById('app'));

var ofs = 0;
(function nextFrame(t) {
    t -= ofs;
    if(circle) {       
        circle.setState({ r: t/20, d: 10, a: Math.max(0, 1-t/3000) });
    }
    if(t > 3000) {
        circle.setState({ x: Math.random()*500, y:Math.random()*500 });
        ofs += t;
    }
    requestAnimationFrame(nextFrame);    
})()


console.log('app running')


