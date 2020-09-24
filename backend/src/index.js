import RegisterRoutes from './routes/api';
import RegisterPublicRoutes from './routes/public'

const port = process.env.PORT || 5000;

const express = require('express');

const app = express(); // Set up Express.

app.set('port', port);

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.disable('etag').disable('x-powered-by');

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*'); //TODO: Rework the cross-site scripting handling.
    next();
});

// Register our routes.
RegisterRoutes(app);
RegisterPublicRoutes(app);

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});