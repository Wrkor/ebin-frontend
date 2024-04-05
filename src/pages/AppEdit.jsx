import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MInput , MCheckbox, MTextarea, MSelect, MForm, MFilepond, TabContent, TabOption, Title, TableHeaderApp, MAppCard, MButton, MFooter, TableBodyAppDelete } from "../components/UI/";
import { getApp, postAppEdit } from '../API/app.service';
import { setAppEdit, changeAppEdit } from '../store/appReducer'
import Loading from './Loading.jsx';

const AppEdit = () => {
  const dispatch = useDispatch();

  const select = useSelector(state => state.constants.select);
  const ext = useSelector(state => state.constants.ext);
  const appChanged = useSelector(state => state.app.appEdit);

  const [iconFile, SetIconFile] = useState('');
  const [imagesFiles, SetImagesFiles] = useState('');
  const [apkFile, SetApkFile] = useState('');

  const urlID = useParams().id;
  const validate = {
    length: 40,
  }

  const appEditBtn = () => {
    const appEdit = {
      id: appChanged.id, 
      name: appChanged.name, 
      status: appChanged.status, 
      description: appChanged.description, 
      version: appChanged.release?.version,
      minAndroid: appChanged.min_android,
      minIos: appChanged.min_ios, 
      testFlight: appChanged.lastUpdate?.testFlight,
      access: '',
      apkFile: apkFile[0],
      iconFile: iconFile[0],
      imagesFiles: imagesFiles,
      developer: appChanged.developer 
    }
    postAppEdit(appEdit)
        .then(response => {
        if (response) {
          dispatch(getApp({id: urlID, action: setAppEdit}))
        }});
  }

  const Clear = () => {
    dispatch(changeAppEdit({...appChanged.app, 
      app: appChanged.app,
      isAndroid: appChanged.app?.lastUpdate?.filePath?.length > 0 ? true : false,
      isIos: appChanged.app?.lastUpdate?.test_flight?.length > 0 ? true : false,
    }));

    SetApkFile(appChanged.app?.lastUpdate?.filePath || '');
    SetImagesFiles(appChanged.app?.images || '');
    SetIconFile(appChanged.app?.icon || '');
  }

  useEffect(() => {
    dispatch(getApp({id: urlID, action: setAppEdit}));
  }, [dispatch, urlID]);
  
  useEffect(() => {
    SetApkFile(appChanged.app?.lastUpdate?.filePath || '');
    SetImagesFiles(appChanged.app?.images || '');
    SetIconFile(appChanged.app?.icon || '');
  }, [appChanged]);

  return (
      appChanged && appChanged.app
      ? 
        <div>
          <Title title="Редактирование" subtitle="Редактируйте карточку приложения в маркете"/>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <TabOption name="Приложение" id="app" active="true"/>
              <TabOption name="О приложении" id="info"/>
              <TabOption name="Графика" id="images"/>
              <TabOption name="Доступ" id="access"/>
              <TabOption name="История обновлений" id="updates"/>
              <TabOption name="Карточка приложения" id="app-card"/>
              <TabOption name="Удаление приложения" id="app-delete"/>
            </div>
          </nav>
          <div className="tab-content mt-4" id="nav-tabContent">
            <TabContent id="app" active="true">
              <MForm validate={validate} title="Название" subtitle="Изменить название приложения">
                <MInput value={appChanged.name || ''} className="ui-size-xl" changeValue={value => dispatch(changeAppEdit({...appChanged, name: value}))} placeholder="Название"/>
              </MForm>
              <MForm className="mb-4" title="Платформа" subtitle="Выберите платформы под которые выпускается приложение">
                <MCheckbox default={appChanged.isAndroid || false} className="ui-size-xl" changeValue={value => dispatch(changeAppEdit({...appChanged, isAndroid: value}))} name="Android"/>
                <MCheckbox default={appChanged.isIos || false} className="ui-size-xl" changeValue={value => dispatch(changeAppEdit({...appChanged, isIos: value}))} name="IOS"/>
              </MForm>
              {
                appChanged?.isAndroid &&
                <MForm className="mb-4" title="Файл" subtitle="Изменить приложение для Android" >
                  <MFilepond value={apkFile || ''} className="ui-size-xl" changeValue={SetApkFile} ext={ext.android} maxFiles={1} name="apk" placeholder="Нажмите или перетащите файл apk..."/>
                </MForm>
              }
              {
                appChanged?.isIos &&
                <MForm validate={validate} title="TestFlight" subtitle="Изменить ссылку на приложение ios в TestFlight">
                  <MInput value={appChanged.lastUpdate?.testFlight || ''} className="ui-size-xl" changeValue={value => dispatch(changeAppEdit({...appChanged, lastUpdate: {...appChanged.lastUpdate, testFlight: value}}))} placeholder="https://"/>
                </MForm>
              }
            </TabContent>

            <TabContent id="info">
              {
                appChanged?.isAndroid &&
                <MForm validate={validate} title="Требование версии Android" subtitle="Напишите минимальную версию Android">
                  <MInput value={appChanged.min_android} className="ui-size-s" changeValue={value => dispatch(changeAppEdit({...appChanged, min_android: value}))} placeholder="14.0"/>
                </MForm>
              }
              {
                appChanged?.isIos &&
                <MForm validate={validate} title="Требование версии IOS" subtitle="Напишите минимальную версию IOS">
                  <MInput value={appChanged.min_ios} className="ui-size-s" changeValue={value => dispatch(changeAppEdit({...appChanged, min_ios: value}))} placeholder="5.0"/>
                </MForm>
              }
              <MForm validate={validate} title="Описание приложения" subtitle="Напишите полное описание приложения">
                <MTextarea value={appChanged.description} className="ui-size-xl" changeValue={value => dispatch(changeAppEdit({...appChanged, description: value}))} placeholder="Приложение - средство для..."/>
              </MForm>
            </TabContent>

            <TabContent id="images">
              <MForm className="mb-4" title="Значок приложения" subtitle="Загрузите значок приложения" >
                <MFilepond value={iconFile} className="ui-size-xl" changeValue={SetIconFile} ext={ext.images} maxFiles={1} name="icon" placeholder="Нажмите или перетащите изображениe..."/>
              </MForm>
              <MForm className="mb-4" title="Фотографии" subtitle="Загрузите фотографии для ознакомления с работой приложения" >
                <MFilepond value={imagesFiles} className="ui-size-xl" changeValue={SetImagesFiles} ext={ext.images} maxFiles={10} name="images" placeholder="Нажмите или перетащите изображения..."/>
              </MForm>
            </TabContent>

            <TabContent id="access">
              <MForm className="mb-4" title="Статус приложения" subtitle="Выберите статус версии приложения в маркете" >
                <MSelect default={appChanged.status} className="ui-size-m" changeValue={value => dispatch(changeAppEdit({...appChanged, status: value}))} options={select.status}/>
              </MForm>
              <MForm className="mb-4" title="Доступ к приложению" subtitle="Выберите уровень доступа к приложению" >
                <MSelect default={appChanged.access} className="ui-size-m" changeValue={value => dispatch(changeAppEdit({...appChanged, access: value}))} options={select.access}/>
              </MForm>
            </TabContent>
                
            <TabContent id="updates">
              История обновлений
            </TabContent>

            <TabContent id="app-card">
              <MAppCard app={appChanged.app}/>
            </TabContent>

            <TabContent id="app-delete">
              <MForm className="mb-4" title="Удаление приложения" subtitle="Приложение будет удалено из маркета навсегда и безвозвратно" >
                <table className="table">
                  <thead>
                    <TableHeaderApp />
                  </thead>
                  <tbody>
                    <TableBodyAppDelete app={appChanged.app}/>
                  </tbody>
                </table>
              </MForm>
            </TabContent>
          </div>
          <MFooter>
            <h6 className='cancel' onClick={() => Clear()}>Не сохранять изменения</h6>
            <MButton className="ui-size-s" name="Сохранить изменения" onClick={appEditBtn} active="true"/>
          </MFooter>
        </div>
      :
        <Loading />
  )
}

export default AppEdit