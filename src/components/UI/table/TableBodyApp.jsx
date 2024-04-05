import React from 'react'
import { useNavigate  } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { EditSVG, ArrowSVG } from '../../SVG';
import { AdvMark, DateFormatter } from '../../../utils'
import classes from './TableBodyApp.module.scss';

const TableBodyApp = ({...props}) => {
  const navigate = useNavigate();
  const routes = useSelector(state => state.constants.routes);
  const platform = useSelector(state => state.constants.platform);

  const editBtn = (id) => {navigate(routes.edit.replace(":id", id))};
  const appBtn = (id) => {navigate(routes.app.replace(":id", id))};

  const app = props.app;

  return (
    <tr className={classes.app}>
      <th scope="row" onClick={() => appBtn(app.id)}>
        <div className='d-flex align-items-center'>
          <div><img src={app.icon} alt="Иконка" /></div>
          <div className='ms-3'>
            <h6 className='mb-3'>{app.name}</h6>
            <h6>{app.developer}</h6>
          </div>
        </div>
      </th>
      {
        !platform.isWindowPhone &&
        <>
          <th onClick={() => appBtn(app.id)}><div className='d-flex justify-content-center'><h6>{app.access}</h6></div></th>
          <th onClick={() => appBtn(app.id)}><div className='d-flex justify-content-center'><h6>{app.status}</h6></div></th>
          {
            !platform.isWindowTablet &&
            <th onClick={() => appBtn(app.id)}><div className='d-flex justify-content-center'><h6>{app.downloads || '-'}</h6></div></th>
          }
          <th onClick={() => appBtn(app.id)}><div className='d-flex justify-content-center'><h6>{app.lastUpdate?.version || '-'}</h6></div></th>
          {
            !platform.isWindowTablet && 
            <>
              <th onClick={() => appBtn(app.id)}><div className='d-flex justify-content-center'><h6>{app.lastUpdate?.date ? DateFormatter(app.lastUpdate?.date) : '-'}</h6></div></th>
              <th onClick={() => appBtn(app.id)}><div className='d-flex justify-content-center'><h6>{app.reviews?.length > 0 ? AdvMark(app.reviews) : "-"}</h6></div></th>
            </>
          }
        </>
      }
      <th>
        <div className='d-flex justify-content-around align-items-center'>
          <EditSVG onClick={() => editBtn(app.id)}/>
          <ArrowSVG onClick={() => appBtn(app.id)}/>
        </div>
      </th>
    </tr>
  )
}

export default TableBodyApp