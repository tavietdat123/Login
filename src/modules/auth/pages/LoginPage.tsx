import React, { useState } from 'react';
// import LoginForm from '../components/LoginForm';
import logo from '../../../logo-420-x-108.png';
import { ILoginParams } from '../../../models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';
import LoginFormV2 from '../components/LoginFormV2';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
      );

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        toast.success('thành công');
        if (values.rememberMe) {
          localStorage.setItem('info-login', JSON.stringify(values));
        } else {
          localStorage.removeItem('info-login');
        }
        dispatch(setUserInfo(json.data));
        Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });
        dispatch(replace(ROUTES.home));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

      <LoginFormV2 onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
    </div>
  );
};

export default LoginPage;
