import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Bold extends React.Component<{}, {}> {
    render() {
        return <b>Hay from webpackless typescripted react!</b>;
    }
}


ReactDOM.render(<Bold />, document.getElementById('app'));


