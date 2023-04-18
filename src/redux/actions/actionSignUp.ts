import { ThunkAction } from 'redux-thunk';
import { getRegionService, getStateService, register } from '../../modules/auth/pages/SignUpService';
import { AppState } from '../reducer/reducer';
import { ISignUpParams } from '../../models/auth';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../utils/constants';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../configs/routes';
import { toast } from 'react-toastify';
import { getErrorMessageResponse } from '../../utils';

export const GET_REGION_SUCCESS = 'GET_REGION_SUCCESS';
export const GET_STATE_SUCCESS = 'GET_STATE_SUCCESS';
export const ON_LOADING = 'ON_LOADING';
export const OFF_LOADING = 'OFF_LOADING';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const getRegion = (): ThunkAction<void, AppState, any, any> => {
  return async (dispatch, getState) => {
    try {
      const response = await getRegionService();
      dispatch({ type: GET_REGION_SUCCESS, payload: response.data.data });
    } catch (error) {
      console.error(error);
    }
  };
};
export const getState = (id: number): ThunkAction<void, AppState, any, any> => {
  return async (dispatch, getState) => {
    try {
      const response = await getStateService(id);
      dispatch({ type: GET_STATE_SUCCESS, payload: response.data.data });
    } catch (error) {
      console.error(error);
    }
  };
};
export const registerAction = (value: ISignUpParams): ThunkAction<void, AppState, any, any> => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ERROR_MESSAGE, payload: '' });
      dispatch({ type: ON_LOADING });
      const response = await register(value);
      dispatch({ type: OFF_LOADING });
      Cookies.set(ACCESS_TOKEN_KEY, response.data.token, { expires: 7 });
      dispatch(replace(ROUTES.home));
      toast.success('Đăng nhập thành công');
    } catch (error: any) {
      console.log(error);
      dispatch({ type: OFF_LOADING });
      dispatch({ type: ERROR_MESSAGE, payload: getErrorMessageResponse(error.response.data) });
    }
  };
};
export const setErrorMessge = () => ({ type: ERROR_MESSAGE, payload: '' });
