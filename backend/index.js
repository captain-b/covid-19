import RegisterRoutes from './src/routes/api';
import RegisterPublicRoutes from './src/routes/public'

const express = require('express');

const app = express();

RegisterRoutes(app);
RegisterPublicRoutes(app);

const port = 5000;

app.listen(port, async function() {
	console.log(`Server running on port: ${port}`);
});