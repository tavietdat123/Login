import React from 'react';
// import LoginForm from '../components/LoginForm';
import logo from '../../../logo-420-x-108.png';
import { ISignUpParams } from '../../../models/auth';
import { useDispatch, useSelector } from 'react-redux';
// import { ThunkDispatch } from 'redux-thunk';
// import { AppState } from '../../../redux/reducer/reducer';
// import { Action } from 'redux';
// import { fetchThunk } from '../../common/redux/thunk';
// import { API_PATHS } from '../../../configs/api';
// import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
// import { setUserInfo } from '../redux/authReducer';
// import Cookies from 'js-cookie';
// import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
// import { ROUTES } from '../../../configs/routes';
// import { replace } from 'connected-react-router';
// import { getErrorMessageResponse } from '../../../utils';
// import { toast } from 'react-toastify';
import SignUpForm from '../components/SinUpForm';
import { registerAction } from '../../../redux/actions/actionSignUp';
import { errorMessageSelector, loadingSelector } from '../../../redux/selector/SigupSelector';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const errorMessage = useSelector(errorMessageSelector);
  // const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  const onLogin = React.useCallback(
    async (values: ISignUpParams) => {
      dispatch(registerAction(values));
      // setErrorMessage('');
      // setLoading(true);
      // const json = await dispatch(
      //   fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
      // );
      // setLoading(false);
      // if (json?.code === RESPONSE_STATUS_SUCCESS) {
      //   toast.success('thành công');
      //   dispatch(setUserInfo(json.data));
      //   Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: 7 });
      //   dispatch(replace(ROUTES.home));
      //   return;
      // }
      // setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

      <SignUpForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
    </div>
  );
};

export default SignUpPage;
