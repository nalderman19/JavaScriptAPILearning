const express = require('express');
const Datastore = require('nedb');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
app.listen(5050, () => console.log("Listening at 5050"));

const db = new Datastore('database.db');
db.loadDatabase();

app.use(express.static('public'));
app.use(express.json({ limit: '50mb'}));

app.post('/api', (request, response) => {
    const data = request.body;
    db.insert(data);
    
    response.json({
        status: "sent"
    });
});

app.post('/db', (request, response) => {
    const kw = request.body.searchWord;
    db.find({word: kw}, (err, docs) => {
        if (err) {
            response.send('bad search');
        } else {
            response.json(docs);
        }
    });
});

app.post('/audio', (request, response) => {
    const wavUrl = request.body.data;
    const buffer = Buffer.from(
        wavUrl.split('base64,')[1],
        'base64'
        )
    fs.writeFileSync('./audio.wav', buffer);
    //db.insert(data);
    response.json({
        status: "sent"
    });
});

// const pythonChild = spawn('python', ['test.py']);

// pythonChild.stdout.on('data', (data) => {
//     console.log("stdout: ", data.toString());
// });

// pythonChild.stderr.on('data', (data) => {
//     console.error("stderr: ", data.toString());
// });

// pythonChild.on('close', (code) => {
//     console.log("Exited With code:", code.toString());
// })