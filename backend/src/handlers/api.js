import Request from '../utils/request';
const apiCallFailedMessage = 'There was an error calling the third party API.';

export const VaccineTrials = async function (req, res) {
	var vaccineInfo;
	try {
		vaccineInfo = await Request.get('vaccine');
	} catch (error) {  // TODO: Add more error handling
		res.status(410).send({description: apiCallFailedMessage});
	}

	const filteredInfo = vaccineInfo.data.map(({candidate, mechanism, sponsors, details, trialPhase, institutions}) => { // Go through the array and replace the "&rsquo;" characters with "'" globally
		return {
			candidate: candidate.replace(/&rsquo;/gi, "'") || 'Not reported.',
			mechanism: mechanism.replace(/&rsquo;/gi, "'") || 'Not reported.',
			sponsors: sponsors.length > 0 ? sponsors : [],
			details: details.replace(/&rsquo;/gi, "'") || 'No details provided.',
			trialPhase: trialPhase.replace(/&rsquo;/gi, "'") || 'Not reported.',
			institutions: institutions.length > 0 ? institutions : []
		};
	});


	res.send(filteredInfo);
};

export const CountryList = async function (req, res) {
	var filteredCountrtData = [];

	try {
		const countryList = await Request.get('countries'); // Request a list of all the available countries

		filteredCountrtData = countryList.map(({continent, country, countryInfo, cases, todayCases, deaths, todayDeaths, todayRecovered, recovered}) => { // Go through the items in the list and extract some params
			if (countryInfo.iso3 !== null || country !== null) {
				
				const iso3 = countryInfo.iso3;
				const flag = countryInfo.flag;
				const location = {lat: countryInfo.lat, long: countryInfo.long};

				return { // Change the data fashion and push them to our array
					continent,
					country,
					flag,
					location,
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
				};
			}
		});
	} catch (error) { // TODO: Add more error handling
		res.status(410).send({description: apiCallFailedMessage});
		return;
	}

    res.send(filteredCountrtData); // Send the filtered list as a the response
};

export const WorldWideData = async function (req, res) {
	try {
		const globalInfo = await Request.get('all');

		res.send({
			cases: globalInfo.cases,
			today: globalInfo.todayCases,
			deaths: globalInfo.deaths,
			deathsToday: globalInfo.todayDeaths,
			recovered: globalInfo.recovered,
			recoveredToday: globalInfo.todayRecovered
		});
	} catch (error) {  // TODO: Add more error handling
		res.status(410).send({description: apiCallFailedMessage});
	}
};

export const CountryData = async function (req, res) {
	try {
		const countryInfo = await Request.get(`countries/${req.params.country}`);

		res.send({
			cases: countryInfo.cases,
			today: countryInfo.todayCases,
			deaths: countryInfo.deaths,
			deathsToday: countryInfo.todayDeaths,
			recovered: countryInfo.recovered,
			recoveredToday: countryInfo.todayRecovered,
			location: {lat: countryInfo.countryInfo.lat, long: countryInfo.countryInfo.long}
		});
	} catch (error) {  // TODO: Add more error handling
		res.status(410).send({description: apiCallFailedMessage});
	}
};

export const HistoricData = async function (req, res) {
	try {
		const historicInfo = await Request.get(`historical/${req.params.country}`, {lastdays: 120});
		res.send(historicInfo.timeline ? historicInfo.timeline : historicInfo);
	} catch (error) {  // TODO: Add more error handling
		res.status(410).send({description: apiCallFailedMessage});
	}
};