import React from 'react'
import { ChevronSVG } from '../../SVG';
import classes from './TableHeader.module.scss';

const TableHeader = ({...props}) => {
  return (
    <th scope="col">
      <div className={`${classes.col} d-flex flex-row align-items-center justify-content-center`}>
        <h6>{props.title}</h6> 
        <ChevronSVG className='ms-2 mt-1'/>
      </div>
    </th>
  )
}

export default TableHeader