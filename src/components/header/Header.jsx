import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Navbar, Container} from 'react-bootstrap';
import { ProfileSVG, MenuSVG } from "../SVG/";
import Canvas from '../canvas/Canvas.jsx';
import UserModal from '../modals/userModal/UserModal.jsx';
import classes from './Header.module.scss';

const Header = () => {
  const routes = useSelector(state => state.constants.routes);
  const platform = useSelector(state => state.constants.platform);
  const isAuth = useSelector(state => state.user.isAuth);
  const user = useSelector(state => state.user.user);

  return (
    <>
      <Navbar sticky="top" expand="sm" className={classes.header}>
          <Container className={`${classes.container} p-0 my-3`}>
                <Navbar.Brand>
                  {
                    isAuth && platform.isWindowPhone ?
                      <MenuSVG data-bs-toggle="offcanvas" className={classes.menu} data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu"/>

                    : 
                      <Link to={routes.main}><h5 className={classes.logo}>EBin Store</h5></Link>
                  }
                </Navbar.Brand>
            
            {
              isAuth &&
              <div className={`${classes.rightMenu} d-flex justify-content-center align-items-center`} data-bs-toggle={platform.isWindowPhone ? "offcanvas" : "modal"} data-bs-target={platform.isWindowPhone ? "#offcanvasMenu" : "#userModal"} aria-controls={platform.isWindowPhone && "offcanvasMenu"}>
                <div className="d-flex flex-column align-items-end me-3">
                  <p className={`${classes.name} mb-1`}>{user.name}</p>
                  <p className={classes.status}>{user.status}</p>
                </div>
                <div className={classes.accountImg}>
                  <ProfileSVG/>
                </div>
              </div>
            }
          </Container>
      </Navbar>
      {
        isAuth &&
        <>
        {
          platform.isWindowPhone 
          ?
            <Canvas/>
          :
            <UserModal/>
        }
        </>
      }
    </>
  )
}

export default Header