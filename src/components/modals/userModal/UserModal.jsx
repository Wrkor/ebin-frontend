import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { whiteTheme, blackTheme }  from '../../../store/constantsReducer'
import { postLogout }  from '../../../API/user.service'
import { ProfileSVG } from "../../SVG/";
import classes from './UserModal.module.scss';

const UserModal = () => {
  const dispatch = useDispatch();
  const isBlackTheme = useSelector(state => state.constants.isBlackTheme);
  const user = useSelector(state => state.user.user);
  const changeThemeBtn = () => {dispatch(isBlackTheme ? whiteTheme() : blackTheme())};
  const logoutBtn = () => {
    document.querySelector("div.modal-backdrop.fade.show").remove();
    dispatch(postLogout())
  };

  return (
    <div className={`${classes.modal} modal fade`} id="userModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className={`${classes.dialog} modal-dialog`}>
        <div className={`${classes.content} modal-content`}>
          <div className={`${classes.body} modal-body p-0`}>
            <div className='d-flex align-items-center m-4'>
              <div className={`${classes.profileSVG} ms-2`}><ProfileSVG/></div>
              <h5 className="modal-title ms-3">{user.name}<br/>{user.middleName}</h5>
            </div>
            <div className='d-flex flex-column justify-content-center mb-4'>
              <h5 className="modal-subtitle mb-3" onClick={changeThemeBtn} >{isBlackTheme ? "Темная тема" : "Светлая тема"}</h5>
              <h5 className="modal-subtitle mb-2" onClick={logoutBtn} data-bs-dismiss="userModal" aria-label="Close">Выйти</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserModal