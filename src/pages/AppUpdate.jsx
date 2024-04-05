import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TabContent, TabOption, Title, MForm, MTextarea, MInput, MFilepond, MAsyncSelect, MAppCard, MFooter, MButton } from '../components/UI';
import { getAppsId, postAppUpdate, getApp } from '../API/app.service';
import { setUpdateCreate, changeUpdateCreate} from '../store/appReducer';
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import '../styles/AppUpdate.scss';

const AppUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ext = useSelector(state => state.constants.ext);
  const update = useSelector(state => state.app.updateCreate);
  const routes = useSelector(state => state.constants.routes);

  const [apkFile, SetApkFile] = useState('');
  const [isNextTab, SetIsNextTab] = useState(true);

  const updateCreateBtn = () => {
    const updateCreate = {
      appId: update.app?.id, 
      apkFile: apkFile[0], 
      testFlight: update.app?.test_flight || '',
      version: update.version, 
      description:  update.description,
    }
    postAppUpdate(updateCreate)
      .then(response => {
        if (response) {
          Clear();
          navigate(routes.app.replace(":id", update.app?.id));
        }
      });
  }

  const changeAppId = (value) => {
    dispatch(getApp({id: value.name, action: setUpdateCreate}));
  };

  const validate = {
    length: 40,
  }

  const NextTab = () => new bootstrap.Tab(isNextTab)?.show();
  
  const Clear = () => {
    dispatch(changeUpdateCreate({}))
    SetApkFile('');
  }

  useEffect(() => {
    let tabCard = document.querySelector('#nav-app-card-tab[data-bs-toggle="tab"]');
    let tabInfo = document.querySelector('#nav-info-tab[data-bs-toggle="tab"]');
    let tabApp = document.querySelector('#nav-app-tab[data-bs-toggle="tab"]');

    tabCard?.addEventListener('show.bs.tab', () => SetIsNextTab(false));
    tabInfo?.addEventListener('show.bs.tab', () => SetIsNextTab(false));
    tabApp?.addEventListener('show.bs.tab', () => SetIsNextTab(tabInfo))
    SetIsNextTab(tabInfo);
  }, []);

  return (
    <div>
      <Title title="Обновление" subtitle="Опишите новвоведение и обновите приложение в маркете"/>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <TabOption name="Приложение" id="app" active="true"/>
          <TabOption name="О приложении" id="info"/>
          <TabOption name="Карточка приложения" id="app-card"/>
        </div>
      </nav>
      <div className="tab-content mt-4" id="nav-tabContent">
        <TabContent id="app" active="true">
            <MForm className="mb-4" title="Приложение" subtitle="Выберите имеющееся приложение из маркета" >
              <MAsyncSelect request={getAppsId} {...(update.app?.name ? { value: {value: update.app.id, label: update.app.name}} : { value: { value: 'disabled', label: 'Выберите...', isDisabled: true }})} className="ui-size-xl" changeValue={changeAppId} />
            </MForm>
            <MForm className="mb-4" title="Файл" subtitle="Загрузите приложение с новой версией для Android" >
              <MFilepond className="ui-size-xl" default={apkFile} changeValue={SetApkFile} ext={ext.android} maxFiles={1} name="apk" placeholder="Нажмите или перетащите файл apk..."/>
            </MForm>
        </TabContent>
        <TabContent id="info">
            <MForm validate={validate} title="Новая версия" subtitle="Напишите новую версию">
              <MInput className="ui-size-s" value={update?.version || ""} changeValue={value => dispatch(changeUpdateCreate({...update, version: value}))} placeholder="1.1.1"/>
            </MForm>
            <MForm validate={validate} title="Информация об обновлении" subtitle="Напишите внесенные изменения в приложение">
              <MTextarea className="ui-size-xl" value={update?.description || ""} changeValue={value => dispatch(changeUpdateCreate({...update, description: value}))} placeholder="Добавлено...&#10;Обновлено..."/>
            </MForm>
        </TabContent>
        <TabContent id="app-card">
          {
            update?.app && update?.app.id 
            ?
              <MAppCard app={update.app}/>
            :
            <div className='choiceApp w-100 d-flex justify-content-center mt-4'>
              <h5>Выберите приложение</h5>
            </div>
          }
        </TabContent>
      </div>
      <MFooter>
        <h6 className='cancel' onClick={() => Clear()}>Сбросить</h6>
        {
          isNextTab
          ?
            <MButton className="ui-size-xs" name="Далее" onClick={() => NextTab()}/>
          :
            <MButton className="ui-size-s" name="Выпустить обновление" onClick={updateCreateBtn} active="true"/>
        }
      </MFooter>
    </div>
  )
}

export default AppUpdate