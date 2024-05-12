import globalConstants from '../config/globalConstants'
import AppCard from '../pages/AppCard.jsx'
import AppCreate from '../pages/AppCreate.jsx'
import AppEdit from '../pages/AppEdit.jsx'
import AppUpdate from '../pages/AppUpdate.jsx'
import Apps from '../pages/Apps.jsx'
import Auth from '../pages/Auth.jsx'
import Error404 from '../pages/Error404.jsx'
import Loading from '../pages/Loading.jsx'

export const privateRoutes = [
	{ path: globalConstants.routes.app, element: <AppCard />, exact: true },
	{ path: globalConstants.routes.apps, element: <Apps />, exact: true },
	{ path: globalConstants.routes.create, element: <AppCreate />, exact: true },
	{ path: globalConstants.routes.update, element: <AppUpdate />, exact: true },
	{ path: globalConstants.routes.edit, element: <AppEdit />, exact: true },
	{ path: globalConstants.routes.error404, element: <Error404 />, exact: true },
]

export const publicRoutes = [
	{ path: globalConstants.routes.login, element: <Auth />, exact: true },
	{ path: globalConstants.routes.error404, element: <Error404 />, exact: true },
]

export const loadRoute = { path: globalConstants.routes.any, element: <Loading />, exact: true }
