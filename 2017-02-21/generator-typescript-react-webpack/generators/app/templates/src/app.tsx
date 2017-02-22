require('./css/app.css')

import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Hello extends React.Component<{}, {show: boolean}> {
    state = { show: false }
    render() {
        var a = new Array(50);
        for(var i = 0; i<a.length; i++) {
            a[i] = Math.random()
        }
        return <div>
            <h1 onClick={(e) => this.setState({ show: !this.state.show })}>Hello</h1>
            {this.state.show ? a.map((el, i) => <div key={i}>{el}</div>) : []}
        </div>;
    }
}

ReactDOM.render(<Hello />, document.getElementById('app'));

console.log('app running')

