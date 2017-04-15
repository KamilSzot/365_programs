process = require 'process'

typeOut = (msg, done) ->
    if msg.length > 0
        process.stdout.write(msg[0]);
        setTimeout((->typeOut(msg.substr(1), done)), Math.random()*100)
    else
        done()
    

typeOutJackMsg = ->
    typeOut("All work and no play make Jack a dull boy.\n", typeOutJackMsg)


do typeOutJackMsg