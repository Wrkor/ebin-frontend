import React from 'react'
import { useSelector } from 'react-redux';
import { TrashSVG } from '../../SVG';
import { DateFormatter, AdvMark } from '../../../utils'
import { postAppDelete } from '../../../API/app.service'
import classes from './TableBodyAppDelete.module.scss';

const TableBodyAppDelete = ({...props}) => {
  const platform = useSelector(state => state.constants.platform);

  const deleteBtn = (id) => {
    if(window.confirm("Уверены?")) 
      postAppDelete({appId: id});
  };

  const app = props.app;

  return (
    <tr className={classes.app}>
      <th scope="row">
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
          <th><div className='d-flex justify-content-center'><h6>{app.access}</h6></div></th>
          <th><div className='d-flex justify-content-center'><h6>{app.status}</h6></div></th>
          {
            !platform.isWindowTablet &&
            <th><div className='d-flex justify-content-center'><h6>{app.downloads || '-'}</h6></div></th>
          }
          <th><div className='d-flex justify-content-center'><h6>{app.lastUpdate?.version || '-'}</h6></div></th>
          {
            !platform.isWindowTablet && 
            <>
              <th><div className='d-flex justify-content-center'><h6>{app.lastUpdate?.date ? DateFormatter(app.lastUpdate?.date) : '-'}</h6></div></th>
              <th><div className='d-flex justify-content-center'><h6>{app.reviews?.length > 0 ? AdvMark(app.reviews) : "-"}</h6></div></th>
            </>
          }
        </>
      }
      <th>
        <div className='d-flex justify-content-around align-items-center'>
          <TrashSVG onClick={() => deleteBtn(app.id)}/>
        </div>
      </th>
    </tr>
  )
}

export default TableBodyAppDelete