import { toast } from 'react-toastify';
import { FormData } from '../component/FilterComponent';
import { DELETE_PAYROLL, GET_FILTER, GET_PAYROLL_SUCCESS, OFF_LOADING_FILTER, ON_LOADING_FILTER } from './action';

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
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface intlPayroll {
  payrollTransactionsList: Payroll[];
  loading: boolean;
  filter: FormData;
}
export interface Payroll {
  id: number;
  status: string;
  date: string;
  client: string;
  currentcy: string;
  tolal: number;
  invoice: string;
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
    case DELETE_PAYROLL:
      toast.success('Xóa thành công');
      return {
        ...state,
        payrollTransactionsList: state.payrollTransactionsList.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
}
