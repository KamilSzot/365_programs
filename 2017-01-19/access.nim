import times
import db_sqlite

let db = db_sqlite.open("db.sqlite3", nil, nil, nil)


db.exec(sql"""
    CREATE TABLE IF NOT EXISTS post (
        id INTEGER PRIMARY KEY,
        title TEXT,
        contents TEXT,
        created_at DATETIME
    )
""")

db.exec(sql"""
    CREATE INDEX IF NOT EXISTS idx_created_at ON post(created_at)
""")



type
    Post* = object
        title*: string
        contents*: string
        created_at*: TimeInfo

proc insert(p: Post) =
    db.exec(sql"""
        INSERT INTO post(title, contents, created_at) 
        VALUES (?, ?, ?)
    """, p.title, p.contents, p.created_at)

import rdstdin, strutils

echo "Create post"
echo "==========="

echo "Title:"    
var title = readLineFromStdin("")

echo "Contents:"
var contents =  readLineFromStdin("")

let p:Post = Post(
    title: title,
    contents: contents,
    created_at: getLocalTime(getTime())
)

p.insert()

echo "Posts saved so far:\n"

for r in db.fastRows(sql"""SELECT title, contents, created_at FROM post"""):
    echo "-----------------------------"
    echo "Date: " & $r[2] 
    echo "Title: " & $r[0] 
    echo "contents: " & $r[1] 



db.close()
