import React, { useEffect } from 'react'
import { TableBodyApp, TableHeaderApp, Title } from '../components/UI'
import useActions from '../hooks/useActions'
import { useApps } from '../hooks/useApps'
import '../styles/Apps.scss'

const Apps = () => {
	const { getApps, setApps } = useActions()
	const apps = useApps()

	const onClickSortBtn = (key, SortBy, isEnc) => apps && key && setApps(SortBy([...apps], key, isEnc))
	useEffect(() => {
		getApps()
	}, [getApps])

	return (
		<div>
			<Title title='Приложения' subtitle='Список всех опубликованных приложений' />
			<table className='table'>
				<thead>
					<TableHeaderApp onClickSortBtn={onClickSortBtn} />
				</thead>
				<tbody>{apps?.length > 0 && apps.map(app => <TableBodyApp key={app.id} app={app} />)}</tbody>
			</table>
			{apps?.length === 0 && (
				<div className='table-void w-100 d-flex justify-content-center mt-4'>
					<h5>Приложений в маркете нет</h5>
				</div>
			)}
		</div>
	)
}

export default Apps
