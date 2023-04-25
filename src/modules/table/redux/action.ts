import { FormDataCreateProduct, FormDataEditProduct } from '../component/ProductDialog';
import { FormData as FormDataFilter } from '../component/FilterComponent';
import {
  deletePayrollService,
  getPayrollByIdService,
  getPayrollService,
  postPayrollService,
  putPayrollService,
} from '../service';
import { AppState } from './../../../redux/reducer/reducer';
import { ThunkAction } from 'redux-thunk';
import { toast } from 'react-toastify';
export const GET_PAYROLL_SUCCESS = 'GET_PAYROLL_SUCCESS';
export const GET_FILTER = 'GET_FILTER';
export const ON_LOADING_FILTER = 'ON_LOADING_FILTER';
export const OFF_LOADING_FILTER = 'OFF_LOADING_FILTER';
export const DELETE_PAYROLL_SUCCESS = 'DELETE_PAYROLL_SUCCESS';
export const GET_CURRENT_PRODUCT = 'GET_CURRENT_PRODUCT';
export function getPayroll(): ThunkAction<void, AppState, any, any> {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ON_LOADING_FILTER });
      const res = await getPayrollService();
      dispatch({ type: OFF_LOADING_FILTER });
      dispatch({ type: GET_PAYROLL_SUCCESS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: OFF_LOADING_FILTER });

      console.log('error', error);
    }
  };
}
export function addPayroll(data: FormDataCreateProduct): ThunkAction<void, AppState, any, any> {
  return async (dispatch, getState) => {
    try {
      const res = await postPayrollService(data);
      if (res) {
        const response = await getPayrollService();
        dispatch({ type: GET_PAYROLL_SUCCESS, payload: response.data.data });
        toast.success('Thêm sản phẩm thành công');
      }
    } catch (error) {
      console.log('error', error);
      toast.error('Thêm sản không phẩm thành công');
    }
  };
}
export function getFilter(payload: FormDataFilter) {
  return {
    type: GET_FILTER,
    payload,
  };
}

export function deletePayroll(data: number): ThunkAction<void, AppState, any, any> {
  return async (dispatch, getState) => {
    try {
      const res = await deletePayrollService(data);
      if (res) dispatch({ type: DELETE_PAYROLL_SUCCESS, payload: data });
      toast.success('Xóa sản phẩm thành công');
    } catch (error) {
      console.log('error', error);
      toast.error('Thêm sản không phẩm thành công');
    }
  };
}
export function getCurrentProduct(id: number): ThunkAction<void, AppState, any, any> {
  return async (dispatch, getState) => {
    try {
      const res = await getPayrollByIdService(id);
      dispatch({ type: GET_CURRENT_PRODUCT, payload: res.data.data });
    } catch (error) {
      console.log('error', error);
    }
  };
}
export function editPayroll(data: FormDataEditProduct): ThunkAction<void, AppState, any, any> {
  return async (dispatch, getState) => {
    try {
      const res = await putPayrollService(data);
      if (res) {
        const response = await getPayrollByIdService(data.id);
        dispatch({ type: GET_CURRENT_PRODUCT, payload: response.data.data });
        toast.success('Sửa sản phẩm thành công');
      }
    } catch (error) {
      console.log('error', error);
      toast.error('Sửas sản không phẩm thành công');
    }
  };
}
