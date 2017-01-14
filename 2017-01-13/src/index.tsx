import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'

const SHOW_TARGET:ActionType = 'SHOW_TARGET'

type ActionType = 'SHOW_TARGET';

type ActionShowTarget = {
    type: ActionType,
    targetId: string
}

type Action = ActionShowTarget;

function showTarget(targetId:string):ActionShowTarget {
    return {
        type: SHOW_TARGET,
        targetId: targetId
    };
}

type State = {targets:{[id:string]:{ active?: boolean }}};
const initialState:State = {
    targets: {
        a:{

        },
        b:{
             
        }
    }
}

function gameApp(state:State = initialState, action: Action) {
    switch(action.type) {
        case SHOW_TARGET:
            console.log(SHOW_TARGET);
            return Object.assign({}, state, { 
                targets: Object.assign({}, state.targets, { [action.targetId]: { active: true }})
            });        
        default:
            return state;
    }
}


class Page extends React.Component<{}, {}> {
    render() {
        return <div>
            <hr />
            <Provider store={store}>
            <Display />
            </Provider>
            <hr />
        </div>;
    }
}

class Display extends React.Component<{}, {}> {
    render() {
        return <b>
            <ConnectedTarget id="a" active={false} />
        </b>;
    }
}
type TargetState = { id: string, active: boolean }
class Target extends React.Component<{ id: string, active: boolean }, {}> {
    render() {
        return <div id={this.props.id} style={{border: this.props.active ? '2px solid black' : 'none'}}>
            {this.props.id}
        </div>;
    }
}

var ConnectedTarget = connect((state:State, ownProps:TargetState) => {
    return {
        active: state.targets[ownProps.id].active,
        id: ownProps.id
    }
}, (dispatch) => {
    return {
    }
  }
)(Target)

var store = createStore(gameApp);
store.subscribe(() => console.log(store.getState()));
document.body.onclick = () => store.dispatch(showTarget('a'));


ReactDOM.render(<Page />, document.getElementById('page'));