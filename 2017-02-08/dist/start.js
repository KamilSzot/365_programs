define(["require", "exports", "react", "react-dom"], function (require, exports, React, ReactDOM) {
    "use strict";
    class Bold extends React.Component {
        render() {
            return React.createElement("b", null, "Hay from webpackless typescripted react!");
        }
    }
    ReactDOM.render(React.createElement(Bold, null), document.getElementById('app'));
});
//# sourceMappingURL=start.js.map