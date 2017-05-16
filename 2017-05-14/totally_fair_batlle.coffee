console.log 'To battle!'

setTimeout(=> 
    if Math.random() < 0.5
        console.log 'You won!'
    else
        console.log 'You lost!'
,1000);