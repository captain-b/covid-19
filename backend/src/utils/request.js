const https = require('https');

const deseasesURL = 'https://disease.sh/v3/covid-19';

export default class Request {
	static async get(url, params) {
		try {
			// Create the full URL
			const fullURL = params ? `${deseasesURL}/${url}?${Object.keys(params).map(key => key + '=' + params[key]).join('&')}` : `${deseasesURL}/${url}`;
			// Send the request
			const response = await request(fullURL);
			return (response);
		} catch (error) {
			throw error;
		}
	}
}

function request(endpoint) {
	return new Promise((resolve, reject) => {
		// Make a GET request
		https.get(endpoint, (resp) => {
		  let data = '';

		  // A chunk of data has been recieved.
		  resp.on('data', (chunk) => {
		    data += chunk;
		  });

		  // The whole response has been received.
		  resp.on('end', () => {
		  	// Convert to JSON
		  	const response = JSON.parse(data);
		  	// Resolve the promise
		    return resolve(response);
		  });

		}).on("error", (error) => {
			// Reject the promise
			return reject(error);
		});
	});
}
