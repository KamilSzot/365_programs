var { napijs, NapijsOptions } = require('napi-js');
var logger = require('napi-js/dist/utils/Logger').default;
var process = require('process');
var _ = require('lodash');
var winston = require('winston')

logger.remove(winston.transports.Console);

var options = new NapijsOptions({ file: process.argv[2] });
napijs(options)
    .then((response)=>{
        if(_.some(response, (f) => f.subtitlesPresent)) {
            console.log("Subtitles!");
        } else {
            console.log("No subtitles :-(");
        }
    })
    .catch((err)=>{
        console.error('Error occurred: ', err);
    });

 // node.exe check.js "F:\torrents\Elementary.S05E14.HDTV.x264-LOL[ettv]\elementary.514.hdtv-lol[ettv].mkv"