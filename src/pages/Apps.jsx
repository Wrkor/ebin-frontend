import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Title, TableHeaderApp, TableBodyApp } from '../components/UI';
import { getApps } from '../API/app.service';
import '../styles/Apps.scss';

const Apps = () => {
  const dispatch = useDispatch();
  const apps = useSelector(state => state.app.apps);

  useEffect(() => {
    dispatch(getApps());
  }, [dispatch]);
  
  return (
    <div>
      <Title title="Приложения" subtitle="Список всех опубликованных приложений"/>
      <table className="table">
        <thead>
          <TableHeaderApp />
        </thead>
        <tbody>
          {
            apps?.length > 0 &&
            apps.map(app => (
              <TableBodyApp key={app.id} app={app}/>
            ))
          }
        </tbody>
      </table>
      {
        apps?.length === 0 && 
        <div className='withoutApp w-100 d-flex justify-content-center mt-4'>
          <h5>Приложений в маркете нет</h5>
        </div>
      }
    </div>
  )
}

export default Apps