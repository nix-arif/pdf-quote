const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/hello.txt');
});

app.listen(3000);
