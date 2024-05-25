import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import globalConstants from '../../config/globalConstants'
import { useUser } from '../../hooks'
import { usePlatforms } from '../../hooks/usePlatforms'
import { MenuSVG, ProfileSVG } from '../SVG/'
import Canvas from '../canvas/Canvas'
import UserModal from '../modals/userModal/UserModal'
import classes from './Header.module.scss'

const Header = () => {
	const { user, isAuth } = useUser()
	const { isWindowPhone } = usePlatforms()

	return (
		<>
			<Navbar sticky='top' expand='sm' className={classes.header}>
				<Container className={`p-0 my-3 ${classes.container}`}>
					<Navbar.Brand>
						{isAuth && isWindowPhone ? (
							<MenuSVG
								data-bs-toggle='offcanvas'
								data-bs-target='#offcanvasMenu'
								aria-controls='offcanvasMenu'
								className={classes.menu}
							/>
						) : (
							<Link to={globalConstants.routes.main}>
								<h5 className={classes.logo}>Эн+ Маркет</h5>
							</Link>
						)}
					</Navbar.Brand>
					{isAuth && (
						<div
							data-bs-toggle={isWindowPhone ? 'offcanvas' : 'modal'}
							data-bs-target={isWindowPhone ? '#offcanvasMenu' : '#userModal'}
							aria-controls={isWindowPhone ? 'offcanvasMenu' : ''}
							className={`d-flex justify-content-center align-items-center ${classes.rightMenu}`}
						>
							<div className='d-flex flex-column align-items-end me-3'>
								<p className={`mb-1 ${classes.name}`}>{user.name}</p>
								<p className={classes.status}>{user.status}</p>
							</div>
							<div className={classes.accountImg}>
								<ProfileSVG />
							</div>
						</div>
					)}
				</Container>
			</Navbar>
			{isAuth && isWindowPhone ? <Canvas /> : <UserModal />}
		</>
	)
}

export default Header
