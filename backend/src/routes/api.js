import {
    CountryList, WorldWideData,
	CountryData, HistoricData
} from "../handlers/api";


const RegisterRoutes = (app) => {
    app.get('/get_countries', CountryList);
    app.get('/get_countries/worldwide', WorldWideData);
    app.get('/get_countries/:country', CountryData);
    app.get('/historic/:country', HistoricData);
};

export default RegisterRoutes;