import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../redux/reducer/reducer';
import { getPhotoService } from '../service';
import { SwithTitle } from '../pages/PhotoPage';
export const GET_PHOTO_SUCCESS = 'GET_PHOTO_SUCCESS';
export const ON_LOADING = 'ON_LOADING';
export const OFF_LOADING = 'OFF_LOADING';
export const HAS_MORE_FALSE = 'HAS_MORE_FALSE';
export const COMFIRM_TITLE_PHOTO = 'COMFIRM_TITLE_PHOTO';

export function getPhoto(start: number, end: number): ThunkAction<void, AppState, any, any> {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ON_LOADING });
      const res = await getPhotoService(start, end);
      if (res.data.length === 0) {
        dispatch({ type: HAS_MORE_FALSE });
      }
      const test = await dispatch({ type: GET_PHOTO_SUCCESS, payload: res.data });
      if (test) dispatch({ type: OFF_LOADING });
    } catch (error) {
      console.log(error);
    }
  };
}

export function confirmAction(payload: Array<SwithTitle>): ThunkAction<void, AppState, any, any> {
  return (dispatch, getState) => {
    dispatch({
      type: COMFIRM_TITLE_PHOTO,
      payload,
    });
  };
}
