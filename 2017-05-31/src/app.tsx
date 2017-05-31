require('./css/app.css')

import * as React from 'react'
import * as ReactDOM from 'react-dom'
interface State { field: "power" | "single" };
class Charts extends React.Component<{}, State> {
    state: State = { field: "power" }
    switchTo = (newField) => () => this.setState({ field: newField })
    highlight = (field):{fontWeight:"bold"|"normal"} => { return { fontWeight: this.state.field == field ? "bold" : "normal"}}
    render() {
        return <div>
            <button onClick={this.switchTo("power")} style={this.highlight("power")}>power</button>
            <button onClick={this.switchTo("single")} style={this.highlight("single")}>single</button>
            <VictoryChart containerComponent={<VictoryVoronoiContainer />}>
                <VictoryAxis tickCount={10} fixLabelOverlap={true} />
                <VictoryAxis dependentAxis tickCount={10} fixLabelOverlap={true} />

                <VictoryScatter labelComponent={<VictoryTooltip />}
                    labels={(d) => d.name + '(' + d.type + ')'}
                    data={chartData}
                    x={(d) => d[this.state.field]}
                    y={(d) => d.price}
                    size={3}
                />
            </VictoryChart>
        </div>;
    }
}


import cpus from './cpus.json'

var chartData = cpus.default;


function cleanup(field: "power" | "single" = "power") {
    do {
        var previous = chartData.length;

        for (let i = 0; i < chartData.length; i++) {
            for (let j = i + 1; j < chartData.length; j++) {
                if (chartData[i][field] > chartData[j][field] && chartData[i].price < chartData[j].price) {
                    if (chartData[j].name.indexOf('1090T') === -1) {
                        chartData.splice(j, 1);
                    }
                }
            }
        }
    } while (chartData.length < previous);
}

cleanup('power');
cleanup('single');

console.log('app running')

import { VictoryScatter, VictoryChart, VictoryAxis, VictoryVoronoiContainer } from 'victory-chart';
import { VictoryTooltip } from 'victory-core';

// load your general data


ReactDOM.render(<Charts />, document.getElementById('app'));
