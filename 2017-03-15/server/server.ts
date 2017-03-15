import * as express from 'express'


var app = express()

app.get('/api', (req, res) => {
    res.send("Hi from server!!!");
});

app.listen(8181, () => {
    console.log("Server listens on port 8181");
});

