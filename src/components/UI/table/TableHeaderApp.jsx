import React from 'react'
import { useSelector } from 'react-redux';
import TableHeader from './TableHeader.jsx';
import classes from './TableHeaderApp.module.scss';

const TableHeaderApp = ({...props}) => {
  const platform = useSelector(state => state.constants.platform);

  return (
    <tr className={classes.app}>
      <TableHeader title="Приложения"/>
      {
        !platform.isWindowPhone &&
        <>
          <TableHeader title="Доступ"/>
          <TableHeader title="Статус"/>
          {
            !platform.isWindowTablet &&
            <TableHeader title="Загружено"/>
          }
          <TableHeader title="Версия"/>
          {
            !platform.isWindowTablet &&
            <>
              <TableHeader title="Обновление"/>
              <TableHeader title="Оценка"/>
            </>  
          }
        </>
        }
        <th scope="col"></th>
    </tr>
  )
}

export default TableHeaderApp