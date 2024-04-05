import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MainSVG, UpdateSVG, UnloadSVG } from "../SVG/";
import classes from './Canvas.module.scss';

const Canvas = () => {
  const routes = useSelector(state => state.constants.routes);
  const currentURL =  useLocation().pathname;

  return (
    <div className={`${classes.canvas} offcanvas offcanvas-start`} data-bs-scroll="false" tabIndex="-1" id="offcanvasMenu" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div className="offcanvas-header">
        <Link to={routes.apps}><h4 className={`${classes.logo} ms-4`} data-bs-dismiss="offcanvas" aria-label="Close">EBin Store</h4></Link>
      </div>
      <div className={`${classes.container} offcanvas-body d-flex flex-column`}>
        <Link to={routes.apps} className={`${classes.link} ${currentURL === routes.apps ? classes.active : ""} my-2 ms-4`}>
          <div className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
            <MainSVG />

            <h5 className='ms-3'>Приложения</h5>
          </div>
        </Link>
        <Link to={routes.update} className={`${classes.link} ${currentURL === routes.update ? classes.active : ""} my-2 ms-4`}>
          <div className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
            <UpdateSVG/>
            
            <h5 className='ms-3'>Обновление</h5>
          </div>
        </Link>
        <Link to={routes.create} className={`${classes.link} ${currentURL === routes.create ? classes.active : ""} my-2 ms-4`}>
          <div className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
            <UnloadSVG/>
            
            <h5 className='ms-3'>Публикация</h5>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Canvas