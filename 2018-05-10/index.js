var express = require('express');
var fs = require('fs');
var https = require('https');

function register(app) {

    let cors = (res, origin) => {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    };

    app.use(function(req, res, next) {
        next();
    });

    app.get('/', function(req, res) {
        res.format({
            'text/html': function() {
                res.send(fs.readFileSync('index.html'));
            }
        });
    });

    app.get('/a', function(req, res) {
        console.log(req.header('Origin')); // request on same domain so no origin header sent
        res.redirect(302,'https://localhost/b'); // redirect to https
    });

    app.get('/b', function(req, res) { 
        console.log(req.header('Origin')); // Origin came from http so origin is http://
        cors(res, "http://localhost:8080"); // allow it
        res.redirect(302, 'http://localhost:8080/c'); // redirect back to http://
    });

    app.get('/c', function(req, res) {
        console.log(req.header('Origin')); // ..... null?
        cors(res, 'null'); // to allow it we need null here ... weird
        res.send('/c');
    });
}

var http = express();
register(http);
http.listen(8080);


var options = { 
    key: fs.readFileSync('key.pem').toString(), 
    cert: fs.readFileSync('cert.pem').toString(),
}

app = express();
register(app);

https.createServer(options, app).listen(443);

