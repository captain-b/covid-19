import {
    CountryList, WorldWideData,
	CountryData
} from "../handlers/api";


const RegisterRoutes = (app) => {
    app.get('/get_countries', CountryList);
    app.get('/get_countries/worldwide', WorldWideData);
    app.get('/get_countries/:country', CountryData);
};

export default RegisterRoutes;