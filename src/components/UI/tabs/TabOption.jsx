import React from 'react'
import {LineSVG} from '../../SVG';
import './TabOption.scss';

const TabOption = ({...props}) => {
  return (
    // eslint-disable-next-line
    <button {...props} className={`nav-link d-flex flex-column align-items-center ${props.active && "active"}`} id={`nav-${props.id}-tab`} data-bs-toggle="tab" data-bs-target={`#nav-${props.id}`} type="button" role="tab" aria-controls={`nav-${props.id}`} aria-selected={`${props.active ? "true" : "false"}`}>
      <h5 className='mb-2'>{props.name}</h5>
      <div className='d-flex align-items-end'>
        <LineSVG preserveAspectRatio="none" />
      </div>
    </button>
  )
}

export default TabOption