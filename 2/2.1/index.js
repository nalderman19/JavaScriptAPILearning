const express = require('express');
const app = express();
app.listen(5050, () => console.log("Listening at 5050"));

app.use(express.static('public'));