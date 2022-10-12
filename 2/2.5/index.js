const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(5050, () => console.log("Listening at 5050"));

const db = new Datastore('database.db');
db.loadDatabase();

app.use(express.static('public'));
app.use(express.json());

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