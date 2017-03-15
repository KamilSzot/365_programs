fetch('/api')
.then(r => r.text())
.then((m) => {
    var e = document.createElement('div');
    e.innerText = m;
    document.body.appendChild(e);
});



import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {observable} from 'mobx'
import {observer} from 'mobx-react'

import {Button, Glyphicon, Form, FormGroup, InputGroup, ButtonGroup, FormControl} from 'react-bootstrap'



@observer
class UserWelcome extends React.Component<{ store: UserNameStore }, { settingUserName: boolean, tempUserName: string }> {
    state = { 
        settingUserName: false,
        tempUserName: ''
    }
    constructor(props) {
        super(props);
        this.state.tempUserName = props.userName;
    }
    startSettingUserName = (e) => {
        this.setState({ settingUserName: true, tempUserName: this.props.store.userName });

        //localStorage.setItem("user_name", "a");
    }
    abortSettingUserName = (e) => {
        this.setState({ settingUserName: false, tempUserName: this.props.store.userName });
    }

    setUserName = (e) => {
        this.props.store.setUserName(this.state.tempUserName);
//        localStorage.setItem("userName", this.state.tempUserName);
        this.setState({ settingUserName: false });
        e.preventDefault();
    }

    changeTempUserName = (e) => {
        this.setState({ tempUserName: e.target.value });
    }

    render() {
        return <div>
            <br />
            <span>Hello </span>
            {this.state.settingUserName ?
                <Form inline={true} className="inline" onSubmit={this.setUserName}>
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" autoFocus value={this.state.tempUserName || ''} onChange={this.changeTempUserName} />
                                <InputGroup.Button>
                                    <Button bsStyle="primary" type="submit"><Glyphicon glyph="ok" /> Save</Button>
                                    <Button bsStyle="default" type="submit" onClick={this.abortSettingUserName}><Glyphicon glyph="remove" /> Cancel</Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                        
                </Form>
            :            
                <a onClick={this.startSettingUserName}>{this.props.store.userName ? this.props.store.userName : '???'}</a>
            }
        
        
        </div>;
    }
}

class UserNameStore {
    @observable userName = localStorage.getItem("userName");
    setUserName(name) {
        this.userName = name;
        localStorage.setItem("userName", name);
    }    
}


var store = new UserNameStore()
var App = (props) => <UserWelcome store={store} />

ReactDOM.render(<App />, document.getElementById('app'));


// 