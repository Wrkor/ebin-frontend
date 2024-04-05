import React, { useEffect } from 'react'
import { useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MAppCard } from '../components/UI'; 
import { getApp } from '../API/app.service';
import { setAppCashed } from '../store/appReducer';
import Loading from './Loading.jsx';

import '../styles/AppCard.scss';

const AppCard = () => {
  const dispatch = useDispatch();
  const app = useSelector(state => state.app.appCashed);

  const urlID = useParams().id;

  useEffect(() => {
    dispatch(getApp({id: urlID, action: setAppCashed}));
  }, [dispatch, urlID]);

  return (
    app && app.id
    ? 
      <MAppCard app={app}/>
    :
      <Loading />
  )
}

export default AppCard