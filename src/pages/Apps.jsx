import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getApps } from '../API/app.service';
import MButton from '../components/UI/button/MButton';

const Apps = () => {
  const dispatch = useDispatch();
  const apps = useSelector(state => state.app.apps);

  useEffect(() => {
    dispatch(getApps());
  }, [dispatch])
  
  return (
    <div>
      <h1>Apps {apps ? apps.length : 0}</h1>
      <MButton>Hey!</MButton>
      </div>
  )
}

export default Apps