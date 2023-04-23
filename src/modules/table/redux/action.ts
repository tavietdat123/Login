import { FormData } from '../component/FilterComponent';
import { getPayrollService } from '../service';
import { AppState } from './../../../redux/reducer/reducer';
import { ThunkAction } from 'redux-thunk';
export const GET_PAYROLL_SUCCESS = 'GET_PAYROLL_SUCCESS';
export const GET_FILTER = 'GET_FILTER';
export const ON_LOADING_FILTER = 'ON_LOADING_FILTER';
export const OFF_LOADING_FILTER = 'OFF_LOADING_FILTER';
export const DELETE_PAYROLL = 'DELETE_PAYROLL';
export function getPayroll(): ThunkAction<void, AppState, any, any> {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ON_LOADING_FILTER });
      const res = await getPayrollService();
      dispatch({ type: OFF_LOADING_FILTER });

      dispatch({ type: GET_PAYROLL_SUCCESS, payload: res.data.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getFilter(payload: FormData) {
  return {
    type: GET_FILTER,
    payload,
  };
}
export function deletePayroll(payload: number) {
  return {
    type: DELETE_PAYROLL,
    payload,
  };
}
