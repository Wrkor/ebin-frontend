import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MInput , MCheckbox, MTextarea, MSelect, MForm, MFilepond, TabContent, TabOption, Title, MButton, MFooter } from "../components/UI/";
import { postAppCreate } from '../API/app.service';
import { setAppCreate } from '../store/appReducer'
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import '../styles/AppCreate.scss';

const AppCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const select = useSelector(state => state.constants.select);
  const ext = useSelector(state => state.constants.ext);
  const app = useSelector(state => state.app.appCreate);
  const routes = useSelector(state => state.constants.routes);

  const [iconFile, SetIconFile] = useState('');
  const [imagesFiles, SetImagesFiles] = useState('');
  const [apkFile, SetApkFile] = useState('');
  const [isNextTab, SetIsNextTab] = useState(true);

  const appCreateBtn = () => {
    const appCreate = {
      name: app.name, 
      status: app.status, 
      description: app.description, 
      version: app.version,
      minAndroid: app.min_android, 
      minIos: app.min_ios, 
      testFlight: app.test_flight,
      access: '',
      apkFile: apkFile[0],
      iconFile: iconFile[0],
      imagesFiles: imagesFiles,
      developer: "En+ Digital"
    }
    postAppCreate(appCreate)
      .then(response => {
        if (response) {
          Clear();
          navigate(routes.apps);
        }
      });
  }

  const validate = {
    length: 40,
  }
  const Clear = () => {
    dispatch(setAppCreate({}));

    SetApkFile('');
    SetImagesFiles('');
    SetIconFile('');
  }

  const NextTab = () => new bootstrap.Tab(isNextTab)?.show();

  useEffect(() => {
    let tabAccess = document.querySelector('#nav-tab #nav-access-tab[data-bs-toggle="tab"]');
    let tabImages = document.querySelector('#nav-images-tab[data-bs-toggle="tab"]');
    let tabInfo = document.querySelector('#nav-info-tab[data-bs-toggle="tab"]');
    let tabApp = document.querySelector('#nav-app-tab[data-bs-toggle="tab"]');

    tabAccess?.addEventListener('show.bs.tab', () => SetIsNextTab(false));
    tabImages?.addEventListener('show.bs.tab', () => SetIsNextTab(tabAccess));
    tabInfo?.addEventListener('show.bs.tab', () => SetIsNextTab(tabImages));
    tabApp?.addEventListener('show.bs.tab', () => SetIsNextTab(tabInfo))
    SetIsNextTab(tabInfo);
  }, []);

  return (
    <div>
      <Title title="Публикация" subtitle="Опишите и загрузите новое приложение в маркет"/>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <TabOption name="Приложение" id="app" active="true"/>
          <TabOption name="О приложении" id="info"/>
          <TabOption name="Графика" id="images"/>
          <TabOption name="Доступ" id="access"/>
        </div>
      </nav>
      <div className="tab-content mt-4" id="nav-tabContent">
        <TabContent id="app" active="true">
          <MForm validate={validate} title="Название" subtitle="Напишите название приложения">
            <MInput className="ui-size-xl" default={app.name} changeValue={value => dispatch(setAppCreate({...app, name: value}))} placeholder="Название"/>
          </MForm>
          <MForm className="mb-4"  title="Платформа" subtitle="Выберите платформы под которые выпускается приложение">
            <MCheckbox className="ui-size-xl" default={app.isAndroid || false} changeValue={value => dispatch(setAppCreate({...app, isAndroid: value}))} name="Android"/>
            <MCheckbox className="ui-size-xl" default={app.isIos || false} changeValue={value => dispatch(setAppCreate({...app, isIos: value}))} name="IOS"/>
          </MForm>
          {
            app?.isAndroid &&
            <MForm className="mb-4" title="Файл" subtitle="Загрузите приложение с новой версией для Android" >
              <MFilepond className="ui-size-xl" default={apkFile} changeValue={SetApkFile} ext={ext.android} maxFiles={1} name="apk" placeholder="Нажмите или перетащите файл apk..."/>
            </MForm>
          }
          {
            app?.isIos &&
            <MForm validate={validate} title="TestFlight" subtitle="Вставьте ссылку на приложение ios в TestFlight">
              <MInput className="ui-size-xl" default={app.test_flight} changeValue={value => dispatch(setAppCreate({...app, test_flight: value}))} placeholder="https://"/>
            </MForm>
          }
        </TabContent>

        <TabContent id="info">
          <MForm validate={validate} title="Версия" subtitle="Напишите версию">
            <MInput className="ui-size-s" default={app.version} changeValue={value => dispatch(setAppCreate({...app, version: value}))} placeholder="1.0.1"/>
          </MForm>
          {
            app?.isAndroid &&
            <MForm validate={validate} title="Требование версии Android" subtitle="Напишите минимальную версию Android">
              <MInput className="ui-size-s" default={app.min_android} changeValue={value => dispatch(setAppCreate({...app, min_android: value}))} placeholder="14.0"/>
            </MForm>
          }
          {
            app?.isIos &&
            <MForm validate={validate} title="Требование версии IOS" subtitle="Напишите минимальную версию IOS">
              <MInput className="ui-size-s" default={app.min_ios} changeValue={value => dispatch(setAppCreate({...app, min_ios: value}))} placeholder="5.0"/>
            </MForm>
          }
          <MForm validate={validate} title="Описание приложения" subtitle="Напишите полное описание приложения">
            <MTextarea className="ui-size-xl" default={app.description} changeValue={value => dispatch(setAppCreate({...app, description: value}))} placeholder="Приложение - средство для..."/>
          </MForm>
        </TabContent>

        <TabContent id="images">
          <MForm className="mb-4" title="Значок приложения" subtitle="Загрузите значок приложения" >
            <MFilepond className="ui-size-xl" default={iconFile} changeValue={SetIconFile} ext={ext.images} maxFiles={1} name="iconFile" placeholder="Нажмите или перетащите изображениe..."/>
          </MForm>
          <MForm className="mb-4" title="Фотографии" subtitle="Загрузите фотографии для ознакомления с работой приложения" >
            <MFilepond className="ui-size-xl" default={imagesFiles} changeValue={SetImagesFiles} ext={ext.images} maxFiles={10} name="imagesFiles" placeholder="Нажмите или перетащите изображения..."/>
          </MForm>
        </TabContent>

        <TabContent id="access">
          <MForm className="mb-4" title="Статус приложения" subtitle="Выберите статус версии приложения в маркете" >
            <MSelect className="ui-size-m" default={app.status} changeValue={value => dispatch(setAppCreate({...app, status: value}))} options={select.status}/>
          </MForm>
          <MForm className="mb-4" title="Доступ к приложению" subtitle="Выберите уровень доступа к приложению" >
            <MSelect className="ui-size-m" default={app.companies} changeValue={_ => dispatch(setAppCreate({...app, companies: null}))} options={select.access}/>
          </MForm>
        </TabContent>
      </div>
      <MFooter>
        {
          isNextTab
          ?
            <MButton className="ui-size-xs" name="Далее" onClick={() => NextTab()}/>
          :
            <MButton className="ui-size-xs" name="Опубликовать" onClick={appCreateBtn} active="true"/>
        }
      </MFooter>
    </div>
  )
}

export default AppCreate