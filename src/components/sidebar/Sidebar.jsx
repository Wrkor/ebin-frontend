import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MainSVG, UnloadSVG, UpdateSVG} from '../SVG';
import classes from './Sidebar.module.scss';

const Sidebar = ({children}) => {
  const routes = useSelector(state => state.constants.routes);
  const platform = useSelector(state => state.constants.platform);
  const currentURL =  useLocation().pathname;
  
  return (
    <div className={`${classes.container} d-flex mt-5 fixed-bottom`}>
      {
        !platform.isWindowPhone &&
        <div className={`${classes.sidebar} d-flex flex-column`}>
          <Link to={routes.apps} className={`${classes.link} ${currentURL === routes.apps ? classes.active : ""} d-flex align-items-center my-2 ms-5`}>
            <MainSVG/>

            <h5 className='ms-3'>Приложения</h5>
          </Link>
          <Link to={routes.update} className={`${classes.link} ${currentURL === routes.update ? classes.active : ""} d-flex align-items-center my-2 ms-5`}>
            <UpdateSVG/>
            
            <h5 className='ms-3'>Обновление</h5>
          </Link>
          <Link to={routes.create} className={`${classes.link} ${currentURL === routes.create ? classes.active : ""} d-flex align-items-center my-2 ms-5`}>
            <UnloadSVG/>
            
            <h5 className='ms-3'>Публикация</h5>
          </Link>
        </div>
      }
      <div className={`d-flex align-items-center w-100 ${!platform.isWindowPhone ? 'ms-5' : 'mx-auto'}`}>
        {children}
      </div>
    </div>
  )
}

export default Sidebar