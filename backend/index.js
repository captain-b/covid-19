const express = require('express');

const app = express();

app.get('/', function(req, res) {
	res.json({test: 'hello'});
});

const port = 5000;

app.listen(port, async function() {
	console.log(`Server running on port: ${port}`);
})