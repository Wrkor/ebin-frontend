import constants from "../store/globalConstants";
import Apps from "../pages/Apps";
import App from "../pages/App";
import AppCreate from "../pages/AppCreate";
import AppUpdate from "../pages/AppUpdate";
import AppEdit from "../pages/AppEdit";
import Error404 from "../pages/Error404";
import Auth from "../pages/Auth";
import Loading from "../pages/Loading";

export const privateRoutes = [
    {path: constants.routes.app, element: <App/>, exact: true},
    {path: constants.routes.apps, element: <Apps/>, exact: true},
    {path: constants.routes.create, element: <AppCreate/>, exact: true},
    {path: constants.routes.update, element: <AppUpdate/>, exact: true},
    {path: constants.routes.edit, element: <AppEdit/>, exact: true},
    {path: constants.routes.error404, element: <Error404/>, exact: true},
]

export const publicRoutes = [
    {path: constants.routes.login,  element: <Auth/>, exact: true},
    {path: constants.routes.error404, element: <Error404/>, exact: true},
]

export const loadRoute = {path: constants.routes.any,  element: <Loading/>, exact: true};

