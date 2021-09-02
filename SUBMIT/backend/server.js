const express = require('express');
const fs = require('fs');
const { promisify } = require('util');
const md5 = require('md5');
const app = express();
const cors = require('cors');
const appendFile = promisify(fs.appendFile);

const port = 6012;

app.use(cors());
app.use(express.json());

app.post('/processform', (req, res) => {
	const id = Math.floor(Math.random() * 99999) + 10000;
	const data = req.body;
	data.id = id;
	writeFile(data);
	res.status(201).json({
		success: true,
		id
	});
});

app.listen(port, () => {
	console.log(`backend listening on port ${port}...`);
});

function writeFile(data) {
	appendFile('./data/users.csv', `${data.id};"${data.name}";"${data.email}";"${md5(data.password)}";"${data.message}";"${data.sendInfo}"\n`)
		.then(() => {
			console.log('file write success');
		})
		.catch((error) => console.log(`error: ${error.message}`));
}