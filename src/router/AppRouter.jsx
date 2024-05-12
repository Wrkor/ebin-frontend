import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import globalConstants from '../config/globalConstants'
import { useUser } from '../hooks'
import { loadRoute, privateRoutes, publicRoutes } from './Routes'

const AppRouter = () => {
	const { isAuth, isAuthLoading, user } = useUser()
	const location = useLocation()

	return !isAuthLoading ? (
		isAuth && user?.roleId === 1 ? (
			<>
				<Sidebar>
					<Routes>
						{privateRoutes.map(route => (
							<Route element={route.element} path={route.path} exact={route.exact} key={route.path} />
						))}
						<Route
							path={globalConstants.routes.login}
							element={<Navigate to={location?.state?.prevUrl || globalConstants.routes.apps} replace />}
						/>
						{publicRoutes.map(route => (
							<Route element={route.element} path={route.path} exact={route.exact} key={route.path} />
						))}
						<Route path={globalConstants.routes.main} element={<Navigate to={globalConstants.routes.apps} replace />} />
						<Route
							path={globalConstants.routes.any}
							element={<Navigate to={globalConstants.routes.error404} replace />}
						/>
					</Routes>
				</Sidebar>
			</>
		) : (
			<>
				<Routes>
					{publicRoutes.map(route => (
						<Route element={route.element} path={route.path} exact={route.exact} key={route.path} />
					))}
					{privateRoutes.map(route => (
						<Route
							element={<Navigate to={globalConstants.routes.login} state={{ prevUrl: location.pathname }} replace />}
							path={route.path}
							exact={route.exact}
							key={route.path}
						/>
					))}
					<Route path={globalConstants.routes.main} element={<Navigate to={globalConstants.routes.login} replace />} />
					<Route
						path={globalConstants.routes.any}
						element={<Navigate to={globalConstants.routes.error404} replace />}
					/>
				</Routes>
			</>
		)
	) : (
		<>
			<Routes>
				<Route element={loadRoute.element} path={loadRoute.path} exact={loadRoute.exact} key={loadRoute.path} />
			</Routes>
		</>
	)
}

export default AppRouter
