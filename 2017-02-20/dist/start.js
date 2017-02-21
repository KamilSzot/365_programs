System.register(["react", "react-dom", "./other.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var react_1, react_dom_1, other_js_1;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (react_dom_1_1) {
                react_dom_1 = react_dom_1_1;
            },
            function (other_js_1_1) {
                other_js_1 = other_js_1_1;
            }
        ],
        execute: function () {
            console.log('start');
            console.log(react_1.default);
            react_dom_1.default.render(react_1.default.createElement("h1", null, "React loaded with systemjs from npm"), document.getElementById('app'));
            console.log(other_js_1.default);
        }
    };
});
//# sourceMappingURL=start.js.map