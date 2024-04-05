import React, { useEffect } from 'react'
import {BrowserRouter} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { postAuth } from './API/user.service';
import { platform, blackTheme, whiteTheme } from './store/constantsReducer'
import AppStyler from './components/styler/AppStyler.jsx'
import AppRouter from "./router/AppRouter.jsx";
import Header from "./components/header/Header.jsx"
import globalConstant from './store/globalConstants';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import './styles/App.scss';

const App = () => {
    const dispatch = useDispatch();
    const setSize = () => dispatch(platform(document.documentElement.clientWidth));
    
    setSize();
    window.onresize = () => setSize();
    
    const theme = localStorage.getItem(globalConstant.localStorageKey.theme);

    if (!theme || theme === globalConstant.localStorageValue.theme.White) 
        dispatch(whiteTheme());

    else if (theme === globalConstant.localStorageValue.theme.Dark)
        dispatch(blackTheme());

    useEffect(() => {
        dispatch(postAuth());
    }, [dispatch])
    
    return (
        <BrowserRouter>
            <Header/>
            <AppRouter />
            <AppStyler/>
        </BrowserRouter>
    )
}

export default App