import { LOG_OUT } from '../../profile/redux/actionProfile';
import { FormData } from '../component/FilterComponent';
import {
  DELETE_PAYROLL_SUCCESS,
  GET_CURRENT_PRODUCT,
  GET_FILTER,
  GET_PAYROLL_SUCCESS,
  OFF_LOADING_FILTER,
  ON_LOADING_FILTER,
} from './action';

const intlPayroll = {
  payrollTransactionsList: [],
  loading: false,
  filter: {
    client: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    invoice: '',
  },
  currentProduct: {
    id: 0,
    status: '',
    currency: '',
    fundingMethod: '',
    total: 0,
    order: '',
    client: '',
    invoice: '',
    createdBy: 0,
    createdAt: '',
    updatedAt: '',
  },
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface intlPayroll {
  payrollTransactionsList: Payroll[];
  loading: boolean;
  filter: FormData;
  currentProduct: Payroll;
}
export interface Payroll {
  id: number;
  status: string;
  currency: string;
  fundingMethod: string;
  total: number;
  order: string;
  client: string;
  invoice: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}
interface Action {
  type: string;
  payload?: any;
}

export default function payrollReducer(state: intlPayroll = intlPayroll, action: Action) {
  switch (action.type) {
    case GET_PAYROLL_SUCCESS:
      return { ...state, payrollTransactionsList: action.payload };
    case ON_LOADING_FILTER:
      return {
        ...state,
        loading: true,
      };
    case OFF_LOADING_FILTER:
      return {
        ...state,
        loading: false,
      };
    case GET_FILTER:
      return {
        ...state,
        filter: {
          client: action.payload.client,
          status: action.payload.status,
          dateFrom: action.payload.dateFrom,
          dateTo: action.payload.dateTo,
          invoice: action.payload.invoice,
        },
      };
    case DELETE_PAYROLL_SUCCESS:
      return {
        ...state,
        payrollTransactionsList: state.payrollTransactionsList.filter((el) => el.id !== action.payload),
      };
    case GET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload,
      };
    case LOG_OUT:
      console.log('test');
      return intlPayroll;
    default:
      return state;
  }
}
