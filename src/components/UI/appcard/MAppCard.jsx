import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getApp } from '../../../API/app.service';
import { setUpdateCreate } from '../../../store/appReducer'
import Update from "../../../components/services/update/Update.jsx";
import Review from "../../../components/services/review/Review.jsx";
import { DownloadSVG, MarkSVG } from '../../SVG';
import { MButton, MSwiper } from "../../UI/";
import { DateFormatter, AdvMark } from '../../../utils'
import Viewer from 'viewerjs';
import classes from './MAppCard.module.scss';
import 'viewerjs/dist/viewer.css';

const MAppCard = ({...props}) => {
  const app = props.app;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const routes = useSelector(state => state.constants.routes);
 
  const editBtn = () => navigate(routes.edit.replace(":id", app.id));
  
  const updateBtn = () => {
    dispatch(getApp({id: app.id, action: setUpdateCreate}));
    navigate(routes.update);
  };

  useEffect(() => {
    new Viewer(document.getElementById('app-icon'), {
      zIndex: 11000,
    });
    new Viewer(document.getElementById('app-images-info'), {
      zIndex: 11000,
    });
  }, []);

  return (
    <div className={`${classes.appCard}`}>
      <div className={`${classes.topic} d-flex justify-content-between`}>
        <div className={classes.info}>
          <div className={classes.title}>
            <h3 className={classes.name}>{app.name}</h3>
            <h6 className={classes.dev}>{app.developer}</h6>
          </div>

          <div className={`${classes.properties} d-flex align-items-center`}>
            <div className='d-flex flex-column align-items-center'>
              <MarkSVG />
              <h6>{app.lastUpdate?.version || '-'}</h6>
            </div>

            <div className={classes.divider}></div>

            <div className='d-flex flex-column align-items-center'>
              <DownloadSVG />
              <h6>{app.size || '-'}</h6>
            </div>
          </div>

          <div className={`${classes.btns} d-flex align-items-center justify-content-between mb-0`}>
            <MButton name="Редактировать" className="ui-size-xs" onClick={editBtn}/>
            <MButton name="Обновить" active="true" className="ui-size-xs" onClick={updateBtn}/>
          </div>
        </div>

        <div className={classes.image}>
            <img id="app-icon" src={app.icon} alt="Иконка приложения" />
        </div>
      </div>

      <div className={classes.swiper}>
        <MSwiper className={classes.mswiper} id="app-images-info" images={app.images} />
      </div>

      <div className={classes.about}>
        <div><h4 className={classes.title}>О приложении</h4></div>

        <div className={classes.description}>
          <h5 className={classes.subtitle}>Описание</h5>
          <h6>{app.description}</h6>
        </div>

        <div className={`${classes.divider} w-100`}></div>
        
        <div className={classes.info}>
          <h5 className={classes.subtitle}>Информация о приложении</h5>
          <div className='d-flex justify-content-between'>
            <div className={classes.col1}>
              <div className={classes.point}>
                <div className={classes.label}>Версия</div>
                <div className={classes.value}>{app.lastUpdate?.version || '-'}</div>
              </div>

              <div className={classes.point}>
                <div className={classes.label}>Требование Android</div>
                <div className={classes.value}>Android {app.min_android || '-'} и выше</div>
              </div>

              <div className={classes.point}>
                <div className={classes.label}>Требование IOS</div>
                <div className={classes.value}>IOS {app.min_ios || '-'} и выше</div>
              </div>
            </div>

            <div className={`${classes.col2} ms-4`}>
              <div className={classes.point}>
                <div className={classes.label}>Последнее обновление</div>
                <div className={classes.value}>{app.lastUpdate?.date ? DateFormatter(app.lastUpdate.date) : '-'}</div>
              </div>

              <div className={classes.point}>
                <div className={classes.label}>Выпущено</div>
                <div className={classes.value}>{app.release?.date ? DateFormatter(app.release.date) : '-'}</div>
              </div>

              <div className={classes.point}>
                <div className={classes.label}>Размер</div>
                <div className={classes.value}>{app.size || '-'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${classes.services} container g-0`}>
        <div className="row g-0">
          <div className={`${classes.reviews} col me-4`}>
            <h4 className={classes.title}>Отзывы</h4>
            <h6 className={classes.mark}>Оценка {app.reviews?.length > 0 ? AdvMark(app.reviews) : "-"}</h6>
            <h6 className={classes.amount}>Количество {app.reviews?.length || "-"}</h6>
            {
                app.reviews?.length > 0 
                ?
                  app.reviews.map(review => (
                    <div key={review.id}>
                      <Review review={review}/>
                    </div>
                  ))
                :
                  <h5 className={classes.notice}>Отзывов нет</h5>
            }
          </div>

          <div className={`${classes.updates} col`}>
            <h4 className={classes.title}>Обновления</h4>
              {
                app.updates?.length > 0 
                ?
                  app.updates.map(update => (
                    <div className={classes.update} key={update.id}>
                      <Update update={update}/>
                      {
                        app.release?.id !== update.id &&
                        <div className={`${classes.divider} w-100`}></div>
                      }
                    </div>
                  ))
                :
                  <h5 className={`${classes.notice} mt-4`}>Обновлений нет</h5>
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MAppCard;
