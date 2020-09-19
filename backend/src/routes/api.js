import {
    Home
} from "../handlers/api";


const RegisterRoutes = (app) => {
    app.get('/get_countries', Home);
};

export default RegisterRoutes;