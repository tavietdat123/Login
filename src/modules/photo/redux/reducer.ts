import { Action } from '../../../redux/reducer/reducerSignUp';
import { SwithTitle } from '../pages/PhotoPage';
import { COMFIRM_TITLE_PHOTO, GET_PHOTO_SUCCESS, OFF_LOADING, ON_LOADING } from './action';

export interface IntlPhoto {
  listPhoto: Array<Photo>;
  loading: Boolean;
  hasMore: boolean;
}
const intlPhoto = { listPhoto: [], loading: false, hasMore: true };
export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export default function photoReducer(state: IntlPhoto = intlPhoto, action: Action) {
  switch (action.type) {
    case GET_PHOTO_SUCCESS:
      return { ...state, listPhoto: [...state.listPhoto, ...action.payload] };
    case ON_LOADING:
      return {
        ...state,
        loading: true,
      };
    case OFF_LOADING:
      return {
        ...state,
        loading: false,
      };
    case COMFIRM_TITLE_PHOTO:
      const newdata = [...state.listPhoto].map((el) => {
        const currentData = action.payload.find((data: SwithTitle) => data.id === el.id);
        if (currentData && el.id === currentData.id) {
          return {
            ...el,
            title: currentData.title,
          };
        }
        return el;
      });

      return {
        ...state,
        listPhoto: newdata,
      };
    default:
      return state;
  }
}
