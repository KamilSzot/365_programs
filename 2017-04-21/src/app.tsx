import './css/app.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Line } from 'react-chartjs-2'
import rawData from './data'
import { ChartOptions, LinearChartData, Chart } from 'chart.js'

class Hello extends React.Component<{}, { show: boolean }> {
    state = { show: false }
    render() {
        var a = new Array(50);
        for (var i = 0; i < a.length; i++) {
            a[i] = Math.random()
        }
        var options: ChartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                xAxes: [{
                    type: 'linear',                    
                    ticks: {                        
                        autoSkip: true,
                        maxTicksLimit: 10,
                        min: rawData.reduce((acc, r) => acc < r.arg ? acc : r.arg, Infinity),
                        max: rawData.reduce((acc, r) => acc > r.arg ? acc : r.arg, -Infinity)
                        
                    },
                    position: 'bottom'


                }],
                yAxes: [{
                    type: 'linear',                    
                    ticks: {                        
                        autoSkip: true,
                        maxTicksLimit: 10
                    }
                }],
            },
            legend: {
                display: false
            },
            events: ['mousewheel']
        }
        var data: LinearChartData = {
//            labels: rawData.map((r) => { return { x: r.arg, y: r.y1 }}) as any,
            datasets: [{
                data: rawData.map((r) => { return { x: r.arg, y: r.y1 }}).sort((a,b) => a.x < b.x ? -1 : a.x==b.x ? 0 : 1),
                fill: false,
                backgroundColor: '#000',
                borderColor: '#000'
            }]
        };
        return <div>
            <h1 onClick={(e) => this.setState({ show: !this.state.show })}>Hello</h1>
            <Line data={data} options={options} />
            {this.state.show ? a.map((el, i) => <div key={i}>{el}</div>) : []}
        </div>;
    }
    componentWillMount() {
        (Chart as any).plugins.register({ 
            beforeInit: () => console.log('Before init'),
            afterEvent: (chart, event) => {
                event.native.preventDefault();
                console.log(event.native);
                chart.options.scales.xAxes[0].ticks.min += event.native.wheelDelta;
                chart.options.scales.xAxes[0].ticks.max += event.native.wheelDelta;
                console.log(chart.options);
                chart.update();
            }
        });
    }
}

ReactDOM.render(<Hello />, document.getElementById('app'));

console.log('app running')

