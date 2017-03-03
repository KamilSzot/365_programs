require('./css/app.css')

import * as React from 'react'
import * as ReactDOM from 'react-dom'


class Screen extends React.Component<{},{}> {
    render() {
        return <div className='screen'>{this.props.children}</div>;
    }

}

class Part extends React.Component<{offset: [number, number], name:string}, { rotation: number }> {    
    state = { rotation: -45 }
    componentDidMount() {
        parts[this.props.name] = this;
    }
    render() {
        return <div className='bone' style={{ left: this.props.offset[0], top: this.props.offset[1], transform: `rotate(${this.state.rotation}deg)` }}>
            {this.props.children}
        </div>;
    }
}
var parts:{[name:string]:Part} = {}
var app = <Screen>
    <Part offset={[window.innerWidth / 2, window.innerHeight / 2]} name='hip'>
        <div style={{ left: -5, top: -5, height: 100, width: 10, backgroundColor: 'black', position: 'absolute' }} />
        <Part offset={[0, 90]} name='knee'>
            <div style={{ left: -5, top: -5, height: 100, width: 10, backgroundColor: 'green', position: 'absolute' }} />
        </Part>
    </Part>
</Screen>;



ReactDOM.render(app, document.getElementById('app'));

(function nextFrame(t:number) {
    t /= 1000
    parts.hip.setState({ rotation: Math.sin(t) * 90 });
    parts.knee.setState({ rotation: Math.sin(t-Math.PI/2) * 45 + 45 });
    requestAnimationFrame(nextFrame);
})(0)



console.log('app running')

