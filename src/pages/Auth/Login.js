import {useContext, useEffect} from 'react';
import {PageTitle} from '../../components/Utilities/Title';
import styled from 'styled-components';

import {useUser} from '../../hooks/useUser';
import {Button} from '@material-ui/core';
import {AuthContext} from '../../contexts/AuthContext';
import {Redirect} from 'react-router';

const RegisterForm = styled.div`
  margin-top: 100px;
  width: 60vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const InputUnit = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 30px;
  padding-bottom: 60px;
  font-size: 20px;
`;

const LoginButton = styled(Button)`
  margin-right: 20px !important;
  font-size: 18px !important;
  border: solid 2px #777;
  background-color: #ddd;
  padding: 5px 20px !important;
  box-shadow: 5px 5px 5px #00000040;
  cursor: pointer;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const Register = () => {
  const {selectUser, setSelectUser, initSelectUser, loginUser} = useUser();
  const {setAuthData, authData} = useContext(AuthContext);

  if (authData) {
    return <Redirect to='/' />;
  }

  const onRegister = () => {
    if (selectUser.mail == '' || selectUser.password == '') {
      alert('全ての項目を入力してください。');
      return;
    }
    if (confirm('データを作成してよろしいですか？')) {
      loginUser(selectUser).then((json) => {
        console.log('tes');
        setAuthData(json);
      });
    }
  };

  useEffect(() => {
    initSelectUser();
  }, []);

  return authData ? (
    <Redirect to='/'></Redirect>
  ) : (
    <div>
      <PageTitle color='blue'>ログイン</PageTitle>
      <RegisterForm>
        <InputUnit>
          <label htmlFor='mailaddress'>メールアドレス</label>
          <input
            type='text'
            id='mailaddress'
            value={selectUser.mail}
            onChange={(e) => setSelectUser({...selectUser, mail: e.target.value})}
          ></input>
        </InputUnit>
        <InputUnit>
          <label htmlFor='password'>パスワード</label>
          <input
            type='password'
            id='password'
            value={selectUser.password}
            onChange={(e) => setSelectUser({...selectUser, password: e.target.value})}
          ></input>
        </InputUnit>
        <LoginButton
          variant='contained'
          color='primary'
          onClick={() => {
            onRegister();
          }}
        >
          ログイン
        </LoginButton>
      </RegisterForm>
    </div>
  );
};

export default Register;