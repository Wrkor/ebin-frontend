import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MButton, MInput } from '../components/UI';
import { postPhone, postLogin } from '../API/user.service';
import '../styles/Auth.scss';

const Auth = () => {
  const dispath = useDispatch();
  const [code, SetCode] = useState('');
  const [phone, SetPhone] = useState('');
  const isEnterPhone = useSelector(state => state.user.isEnterPhone);

  return (
    <div className='form-auth d-flex flex-column align-items-center w-100'>
      <h1>EBin Store</h1>
      {
        isEnterPhone ?
        <>
          <h6>Введите код отправленный на телефон</h6>
          <MInput value={code} changeValue={value => SetCode(value)} className="ui-size-m" placeholder="Код"/>
          <MButton name="Далее" onClick={() => dispath(postLogin({phone, code}))} className="ui-size-m"/>
        </>
        :
        <>
          <h6>Введите свой номер телефона</h6>
          <MInput value={phone} changeValue={value => SetPhone(value)} className="ui-size-m" placeholder="+7(___)-___-____"/>
          <MButton name="Далее" onClick={() => dispath(postPhone(phone))} className="ui-size-m"/>
        </>
      }
    </div>
  )
}

export default Auth