console.log("started")

import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Timeline extends React.Component<{ }, {}> {
    timeline:TL.ITimeline;
    container:HTMLElement;
    componentDidMount() {
        var data = {
            events: [
                {
                    start_date: { year: 2017, month: 2, day: 19 },
                    text: {
                        headline: 'The day this page was created',
                        text: 'This is the day I tried TiemlineJS for myself.'
                    }
                }
            ]

        };            
        var options = {};            
        this.timeline = new TL.Timeline(this.container, data); // needs fix in @types/timelinejs3/index.d.ts to accept htmlelement
    }
    componentWillUnmount() {
        // Can't find a way to clean up after Timeline. I guess I'll just need to detach it and reattach it if this component gets mounted again.
    }
    render() {
        return <div ref={(el) => this.container = el}></div>;
    }
}

ReactDOM.render(<Timeline />, document.getElementById('tl'));
