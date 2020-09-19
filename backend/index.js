import RegisterRoutes from './src/routes/api';
import RegisterPublicRoutes from './src/routes/public'

const express = require('express');

const app = express(); // Set up Express.

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.disable('etag').disable('x-powered-by');

// Register our routes.
RegisterRoutes(app);
RegisterPublicRoutes(app);

const port = 5000;

app.listen(port, async function() { // Listen to the specified port for requests.
	console.log(`Server running on port: ${port}`);
});