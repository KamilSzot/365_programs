require('./css/app.css')

import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Hello extends React.Component<{}, {show: boolean, k:number}> {
    state = { show: false, k:0 }
    toggle = () => {
        this.setState({k:Math.random()});
    }
    render() {
        var a = new Array(50);
        for(var i = 0; i<a.length; i++) {
            a[i] = Math.random()
        }
        return <div>
            <h1 onClick={(e) => this.setState({ show: !this.state.show })}>Hello</h1>
            <button onClick={this.toggle}>Reset</button>
            <Test key={this.state.k} val="default" />
        </div>;
    }
}

class Test extends React.Component<{ val?: string }, { val: string }> {
    state = { val: '' }
    constructor(props) {
        super(props);
        this.state = props;
    }
    handleChange = (e) => {
        this.setState({ val: e.target.value })
    }
    render() {
        return <h2>
            <input type="text" value={this.state.val} onChange={this.handleChange}/>
        </h2>;
    }
}

ReactDOM.render(<Hello />, document.getElementById('app'));

console.log('app running')

