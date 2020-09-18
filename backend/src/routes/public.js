import {
    Home,
} from "../handlers/api";

const path = require('path');

const RegisterPublicRoutes = (app) => {
    app.get('/', Home);
};

export default RegisterPublicRoutes;