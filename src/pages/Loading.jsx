import React from 'react'
import { useSelector } from 'react-redux';

const Loading = () => {
  const isBlackTheme = useSelector(state => state.constants.isBlackTheme);

  return (
    <div className='d-flex w-100 justify-content-center mt-5'>
      <div className={`spinner-border ${isBlackTheme ? "text-light" : ""}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loading