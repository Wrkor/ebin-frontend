import React, { useEffect } from 'react'
import {BrowserRouter} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { postAuth } from './API/user.service';
import AppRouter from "./router/AppRouter";
import './styles/App.scss';

const App = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(postAuth());
    }, [dispatch])

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    )
}

export default App