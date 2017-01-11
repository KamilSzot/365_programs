import React from 'react'
import ReactDOM from 'react-dom'

class Page extends React.Component<{}, {}> {
    render() {
        return <div>
            <hr />
            <Form />
            <hr />
        </div>;
    }
}

class Form extends React.Component<{ }, {data: { visitors: any[] }}> {
    constructor(props) {
        super(props);
        this.state = {
            data: { visitors: [] }
        };
    }
    handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(this.state.data);
    }
    handleChange(value:{}, name:string | number) {
        this.setState({ data: Object.assign({}, this.state.data, {[name]: value})});        
    }
    render() {
        return <form onSubmit={(e) => this.handleSubmit(e)}>
            <InputPeople name='visitors' value={this.state.data.visitors} onChange={(value, name) => this.handleChange(value, name)}/>
            <hr />
            <button type="submit">Submit</button>
        </form>;
    }
}

class InputComponent<Value> extends React.Component<{ name: string | number, value?: Value, onChange: (value:Value, name?:string | number) => void}, { }> {}

interface Person {firstName: string, lastName:string};

class InputPeople extends InputComponent<Person[]> {
    static defaultProps = {
        value: []
    }
    handleAddPerson() {
        this.props.onChange(this.props.value.concat({ firstName: "", lastName: ""}), this.props.name);
    }
    handleDeletePerson(i:number) {
        var newValue = this.props.value.slice(0);
        newValue.splice(i, 1);
        this.props.onChange(newValue, this.props.name);
    }
    handleChange(person:Person, name: number) {
        var newValue = this.props.value.slice(0);
        newValue[name] = person;
        this.props.onChange(newValue, this.props.name);
    }
    render() {
        return <div>
            {this.props.value.map((person, i) =>
                <div key={i}>
                    <InputPerson name={i} value={person} onChange={(value, name:number) => this.handleChange(value, name)}/>
                    <button type="button" onClick={() => this.handleDeletePerson(i)}>Delete</button>
                    <hr />
                </div>
            )}
            <button type="button" onClick={() => this.handleAddPerson()}>Add person</button>
        </div>;
    }
}

class InputPerson extends InputComponent<Person> {
    static defaultProps = {
        value: { firstName: "", lastName: "" }
    }
    handleChange(value:string, name:string | number) {
        var newValue = Object.assign({}, this.props.value, { 
            [name]: value 
        });
        this.props.onChange(newValue, this.props.name);
    }
    render() {
        return <div>
            <table>
                <tbody>
                    <tr>
                        <td><label>First Name</label></td>
                        <td><Input name="firstName" value={this.props.value.firstName} onChange={(value, name) => this.handleChange(value, name)} /></td>
                    </tr>
                    <tr>
                        <td><label>Last Name</label></td>
                        <td><Input name="lastName" value={this.props.value.lastName} onChange={(value, name) => this.handleChange(value, name)} /></td>
                    </tr>
                </tbody>            
            </table>
        </div>;
    }
} 

class Input extends InputComponent<string> {
    static defaultProps = {
        value: ""
    }
    handleChange(value) {
        this.props.onChange(value, this.props.name);
    }
    render() {
        return <input type="text" name={this.props.name.toString()} value={this.props.value} onChange={(e) => this.handleChange((e.target as HTMLInputElement).value)} />
    }
}

ReactDOM.render(<Page />, document.getElementById('page'));