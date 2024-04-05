import constants from "../store/globalConstants";
import Apps from "../pages/Apps.jsx";
import AppCard from "../pages/AppCard.jsx";
import AppCreate from "../pages/AppCreate.jsx";
import AppUpdate from "../pages/AppUpdate.jsx";
import AppEdit from "../pages/AppEdit.jsx";
import Error404 from "../pages/Error404.jsx";
import Auth from "../pages/Auth.jsx";
import Loading from "../pages/Loading.jsx";

export const privateRoutes = [
    {path: constants.routes.app, element: <AppCard/>, exact: true},
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

