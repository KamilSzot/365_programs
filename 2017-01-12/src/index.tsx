import React from 'react'
import ReactDOM from 'react-dom'

class Page extends React.Component<{}, {}> {
    render() {
        return <div>
            <hr />
            <Display />
            <hr />
        </div>;
    }
}

type DataForBox = {x:number, y:number, width:number, height: number};
type MouseEventHandler = (e:React.MouseEvent<SVGElement>) => void;

type DraggableState = { origin: { x: number, y:number }, mouseOrigin: { x: number, y:number }, dragging:boolean, mouse: { x: number, y:number }};
function draggable(Item:React.ComponentClass<BoxProps>) {
    return class Draggable extends React.Component<DataForBox & { onPositionChanged?: Function }, DraggableState> {
        constructor(props) {
            super(props);
            this.state = {
                origin: {x:0, y:0},
                mouseOrigin: {x:0, y:0},
                mouse: {x: 0, y:0},
                dragging:false
            }
        }
        onMouseMove:MouseEventHandler = (e) => {
            if(this.state.dragging) {
                this.setState({ 
                    mouse: {
                        x: e.clientX,
                        y: e.clientY                    
                    },
                } as DraggableState);
            }
        }
        onMouseUp:MouseEventHandler = (e) => {
            if(this.state.dragging) {
                this.props.onPositionChanged({ 
                    x: this.state.origin.x + this.state.mouse.x - this.state.mouseOrigin.x, 
                    y: this.state.origin.y + this.state.mouse.y - this.state.mouseOrigin.y,
                });
                this.setState({ 
                    dragging: false
                } as DraggableState);
            }
        }
        onMouseDown:MouseEventHandler = (e) => {
            var target = e.target as SVGRectElement;
            this.setState({ 
                origin: { 
                    x: target.x.baseVal.valueInSpecifiedUnits, 
                    y: target.y.baseVal.valueInSpecifiedUnits 
                },
                mouseOrigin: {
                    x: e.clientX,
                    y: e.clientY                    
                },
                mouse: {
                    x: e.clientX,
                    y: e.clientY                    
                },
                dragging: true
            },() => console.log(this.state));
        }
        render() {
            var x = this.props.x + (this.state.dragging ? (this.state.mouse.x - this.state.mouseOrigin.x) : 0);
            var y = this.props.y + (this.state.dragging ? (this.state.mouse.y - this.state.mouseOrigin.y) : 0);
            return (
                <Item {...this.props} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} x={x} y={y} />
            )
        }
    }
}
type DisplayState = { boxes: DataForBox[], hand:{} }
class Display extends React.Component<{}, DisplayState> {
    constructor(props:{}) {
        super(props);
        this.state = {
            boxes: [{
                x: 10,
                y: 10,
                width: 200,
                height: 100
            }],
            hand:{
                box: null
            }
        }
    }
    handlePostionChanged = (p:{x:number, y:number}, i:number) => {
        var newBoxes = this.state.boxes.slice(0);
        newBoxes[i] = Object.assign({}, newBoxes[i], p);
        this.setState({
            boxes: newBoxes
        } as DisplayState);
    }
    render() {
        return <svg width="600" height="300" style={{ background:'#EEE'}}>
            {this.state.boxes.map((b, i) => {
                var DraggableBox = draggable(Box);
                return <DraggableBox key={i} x={b.x} y={b.y} width={b.width} height={b.height} onPositionChanged={(p) => this.handlePostionChanged(p, i)} />
            })}
        </svg>;
    }
}
type BoxProps =  DataForBox & { onMouseDown?: MouseEventHandler, onMouseMove?: MouseEventHandler, onMouseUp?: MouseEventHandler };
class Box extends React.Component<BoxProps, {}> {
    render() {
        return <g>
            <rect x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} 
                onMouseDown={(e) => this.props.onMouseDown && this.props.onMouseDown(e)}
                onMouseMove={(e) => this.props.onMouseMove && this.props.onMouseMove(e)}
                onMouseUp={(e) => this.props.onMouseUp && this.props.onMouseUp(e)}
            />
        </g>;
    }
}

ReactDOM.render(<Page />, document.getElementById('page'));