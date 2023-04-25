import { createSelector } from 'reselect';
import { AppState } from '../../../redux/reducer/reducer';
import moment from 'moment';
import { Payroll } from './reducer';

export const LoadingFilterSelector = (state: AppState) => state.payroll.loading;
export const payrollSelector = (state: AppState) => state.payroll.payrollTransactionsList;
export const filterSelector = (state: AppState) => state.payroll.filter;
export const currentProductSelector = (state: AppState) => state.payroll.currentProduct;
export const clientSelector = (state: AppState) => {
  const newdata: Array<string> = state.payroll.payrollTransactionsList.map((el) => el.client);
  const uniqueArr = [...new Set(newdata)];
  return uniqueArr;
};
export const statusSelector = (state: AppState) => {
  const newdata: Array<string> = state.payroll.payrollTransactionsList.map((el) => el.status);
  const uniqueArr = [...new Set(newdata)];
  return uniqueArr;
};
export const payrollRemaining = createSelector(
  payrollSelector,
  filterSelector,
  (listData, { client, status, dateFrom, dateTo, invoice }) => {
    if (!client && !status && !dateFrom && !dateTo && !invoice) {
      return listData;
    }
    let newListData: Array<Payroll | undefined> = [];

    if (client) {
      newListData = [...listData.filter((el) => el.client === client)];
    }
    if (status) {
      if (newListData.length === 0) {
        newListData = [...listData.filter((el) => el.status === status)];
      } else if (newListData.length > 0) {
        newListData = [...newListData.filter((el: any) => el.status === status)];
      }
    }
    if (dateFrom) {
      if (newListData.length === 0) {
        newListData = [
          ...listData.filter((el) => {
            const date = moment(el.createdAt);
            const date1 = moment(dateFrom);
            const date2 = moment(dateTo);
            return date.isBefore(date2) && date.isAfter(date1);
          }),
        ];
      } else if (newListData.length > 0) {
        newListData = [
          ...newListData.filter((el: any) => {
            const date = moment(el.createdAt);
            const date1 = moment(dateFrom);
            const date2 = moment(dateTo);
            return date.isBefore(date2) && date.isAfter(date1);
          }),
        ];
      }
    }
    if (invoice) {
      if (newListData.length === 0) {
        newListData = [...listData.filter((el) => el.invoice && el.invoice.includes(invoice.trim()))];
      } else if (newListData.length > 0) {
        newListData = [...newListData.filter((el: any) => el.invoice && el.invoice.includes(invoice.trim()))];
      }
    }
    const uniqueArr = [...new Set(newListData.map((obj) => JSON.stringify(obj)))].map((str) => JSON.parse(str));
    return uniqueArr;
  },
);
