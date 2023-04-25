import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../redux/reducer/reducer';
import { getInfoUserService, updateAvatarFileService } from '../serviceProfile';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const LOG_OUT = 'LOG_OUT';
export function getInfoUser(): ThunkAction<void, AppState, any, any> {
  return async (dispatch, getState) => {
    try {
      const res = await getInfoUserService();
      dispatch({ type: GET_USER_SUCCESS, payload: res.data.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function updateAvatar(data: any): ThunkAction<void, AppState, any, any> {
  return async (dispatch, getState) => {
    try {
      const res = await updateAvatarFileService(data);
      if (res) {
        const response = await getInfoUserService();
        dispatch({ type: GET_USER_SUCCESS, payload: response.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export function logout() {
  return { type: LOG_OUT };
}
