// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});



function car({x, y, hubSize = 20, wheelDistance = 45, wheelSize = 30}) {    
    console.log(x,y,hubSize)
    var hub = Bodies.circle(x, y, hubSize/2);
    var wheels = []
    var connections = []

    var nodes = []
    for(var j = 0; j<3;j++) {
        var node = Bodies.circle(x+hubSize*Math.sin(Math.PI+2*Math.PI*(j/3)), y-hubSize*Math.cos(Math.PI+2*Math.PI*(j/3)), hubSize/5);
        nodes.push(node);
        if(j>0) {
            connections.push(Matter.Constraint.create({
                 bodyA: node,
                 bodyB: nodes[j-1]
            }));
        }
    }
    connections.push(Matter.Constraint.create({
            bodyA: nodes[0],
            bodyB: nodes[2]
    }));
    for(var i = 0; i<3; i++) {
        var wheel = Bodies.circle(x + wheelDistance*Math.sin(i*2*Math.PI/3), y - wheelDistance*Math.cos(i*2*Math.PI/3), wheelSize);
        wheels.push(wheel);
        for(var j = 0; j<2;j++) {
            connections.push(Matter.Constraint.create({
                bodyA: nodes[(i+j+1)%3],
                bodyB: wheel
            }));
            // connections.push(Matter.Constraint.create({
            //     bodyA: nodes[(j+1)%3],
            //     bodyB: wheel
            // }));
        }
        
    }


    return wheels.concat([]).concat(connections).concat(nodes);
}









var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

function drawStairs(x, y, stepWidth, stepHeight, stepCount) {
    var b = []
    for(var i = 0; i<stepCount; i++) {
        b.push(Bodies.rectangle(x+(i+0.5)*stepWidth, y-(i+0.5)*stepHeight, stepWidth, stepHeight, {isStatic: true}));
    }
    return b;
}

// add all of the bodies to the world
World.add(engine.world, [ground].concat(drawStairs(400,580,80,80,5)).concat(car({x: 700, y: 100})));

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);