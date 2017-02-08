document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    function redraw() {
        console.log('redraw');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillRect(0, 0, 100, 100);
        ctx.font = "30px Arial";
        ctx.fillText("Hello", 100, 100);
    }
    window.addEventListener('resize', redraw);
    redraw();
    var old;
    canvas.addEventListener('mouseout', function (e) {
        old = undefined;
    });
    canvas.addEventListener('click', function (e) {
        redraw();
    });
    canvas.addEventListener('mousemove', function (e) {
        var x = e.clientX, y = e.clientY;
        if (old && (old.x != x || old.y != y)) {
            var qx = x - old.x;
            var qy = y - old.y;
            var a = Math.atan2(qy, qx) + Math.PI / 2;
            var r = Math.sqrt(qx * qx + qy * qy);
            var dx = Math.cos(a) * r;
            var dy = Math.sin(a) * r;
            ctx.beginPath();
            ctx.moveTo(x - dx, y - dy);
            ctx.lineTo(x + dx, y + dy);
            ctx.stroke();
        }
        old = { x: x, y: y };
    });
});
