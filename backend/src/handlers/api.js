import Request from '../utils/request'

export const Home = async function (req, res) {
	var filteredCountrtData = [];

	try {
		const countryList = await Request.get('countries'); // Request a list of all the available countries

		filteredCountrtData = countryList.map(({continent, country, countryInfo, cases, todayCases, deaths, todayDeaths, todayRecovered, recovered}) => { // Go through the items in the list and extract some params
			if (countryInfo.iso3 !== null) {
				
				const iso3 = countryInfo.iso3;
				const flag = countryInfo.flag;

				return [{ // Change the data fashion and push them to our array
					continent,
					country,
					flag,
					iso3,
					cases: {
						today: todayCases,
						total: cases
					},
					deaths: {
						today: todayDeaths,
						total: deaths
					},
					recovered: {
						today: todayRecovered,
						total: recovered
					}
				}];
			}
		});
	} catch (error) { // TODO: Add more error handling
		res.status(410).send({description: 'There was an error calling the third party API.'});
		return;
	}

    res.send(filteredCountrtData); // Send the filtered list as a the response
};