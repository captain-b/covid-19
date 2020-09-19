import Request from '../utils/request'

export const Home = async function (req, res) {
	try {
		console.log('test');
		const test = await Request.get('countries');
		test.map((country) => {
			if (country.countryInfo.iso3 === null)
				console.log(country);
			// else
			// 	console.log(country.countryInfo.iso3);
		});
	} catch (error) {
		console.log('test2');
		console.log(error);
	}

    res.send('hi');
};