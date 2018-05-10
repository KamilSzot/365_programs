fs = require 'fs-extra'

l = console.log.bind(console)


#root = '\\\\DYSK\\Porzadek\\Sprawy'

mergeAll = ->

    dirs = fs.readdirSync root

    dirs = dirs.filter (a) => /____/.test a

    for dir in dirs
        merge dir

merge = (dir) ->
    firstDir = root+'\\'+dir
    secondDir = firstDir.replace('____', '___')

    firstFiles = fs.readdirSync firstDir
    secondFiles = fs.readdirSync secondDir

    for name in firstFiles
        firstFile = firstDir+'\\'+name
        secondFile = secondDir+'\\'+name
        if not (name in secondFiles)
            fs.move(firstFile, secondFile)
        else
            firstStat = fs.statSync firstFile
            secondStat = fs.statSync secondFile

            if firstStat.size != secondStat.size
                logStats firstFile, firstStat                
                logStats secondFile, secondStat      

    fs.remove firstDir          
        

logStats = (name, {size, mtime, ctime, atime, birthtime}) ->
    l name, size, mtime, ctime, atime, birthtime




mergeAll()