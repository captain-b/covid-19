import {
    CountryList, WorldWideData,
	CountryData, HistoricData,
	VaccineTrials
} from "../handlers/api";


const RegisterRoutes = (app) => {
    app.get('/get_countries', CountryList);
    app.get('/get_countries/worldwide', WorldWideData);
    app.get('/get_countries/:country', CountryData);
    app.get('/historic/:country', HistoricData);
    app.get('/trials/vaccines', VaccineTrials);
    // app.get('/trials/theraputic', TheraputicTrials);
};

export default RegisterRoutes;