import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MAppCard } from '../components/UI'
import useActions from '../hooks/useActions'
import '../styles/AppCard.scss'
import Loading from './Loading'

const AppCard = () => {
	const appCashed = useSelector(state => state.app.appCashed)
	const { getApp, setAppCashed, clearAppCashed } = useActions()
	const urlID = useParams().id

	useEffect(() => {
		getApp({ id: urlID }).then(({ payload, meta }) => {
			if (meta?.requestStatus === 'fulfilled') setAppCashed(payload)
		})
		return () => clearAppCashed()
	}, [getApp, setAppCashed, clearAppCashed, urlID])

	return appCashed?.id ? <MAppCard app={appCashed} /> : <Loading />
}

export default AppCard
