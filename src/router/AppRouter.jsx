import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes, loadRoute} from "./";
import { useSelector } from 'react-redux';

const AppRouter = () => {
    const isAuthLoading = useSelector(state => state.user.isAuthLoading);
    const isAuth = useSelector(state => state.user.isAuth);
    const routes = useSelector(state => state.constants.routes);

    return (
        !isAuthLoading ?
            isAuth
                ?
                <Routes>
                    {privateRoutes.map(route =>
                        <Route
                            element={route.element}
                            path={route.path}
                            exact={route.exact}
                            key={route.path}
                        />
                    )}
                    <Route
                        path={routes.login}
                        element={<Navigate to={routes.apps} replace />}
                    />
                    {publicRoutes.map(route =>
                        <Route
                            element={route.element}
                            path={route.path}
                            exact={route.exact}
                            key={route.path}
                        />
                    )}
                    <Route
                        path={routes.main}
                        element={<Navigate to={routes.apps} replace />}
                    />
                    <Route
                        path={routes.any}
                        element={<Navigate to={routes.error404} replace />}
                    />
                </Routes>
                :
                <Routes>
                    {publicRoutes.map(route =>
                        <Route
                            element={route.element}
                            path={route.path}
                            exact={route.exact}
                            key={route.path}
                        />
                    )}
                    {privateRoutes.map(route =>
                        <Route
                            element={<Navigate to={routes.login} replace />}
                            path={route.path}
                            exact={route.exact}
                            key={route.path}
                        />
                    )}
                    <Route
                        path={routes.main}
                        element={<Navigate to={routes.apps} replace />}
                    />
                    <Route
                        path={routes.any}
                        element={<Navigate to={routes.error404} replace />}
                    />
                </Routes>
            : 
            <Routes> 
                <Route
                    element={loadRoute.element}
                    path={loadRoute.path}
                    exact={loadRoute.exact}
                    key={loadRoute.path}
                />
            </Routes>
    );
}

export default AppRouter