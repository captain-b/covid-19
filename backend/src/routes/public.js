import {
    Home,
} from "../handlers/api";

const RegisterPublicRoutes = (app) => {
    app.get('/', Home);
};

export default RegisterPublicRoutes;