import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { LS_LANG } from '../constants';

export interface IntlState {
  readonly locale: string;
}

export const setLocale = (locale: string) => {
  localStorage.setItem(LS_LANG, locale);
  return setLocaleAction(locale);
};

const setLocaleAction = createCustomAction('setLocale', (locale: string) => ({
  locale,
}));

const actions = { setLocale };

type Action = ActionType<typeof actions>;
const currentLang = localStorage.getItem(LS_LANG);

export default function reducer(state: IntlState = { locale: currentLang ?? 'vi' }, action: Action) {
  switch (action.type) {
    case getType(setLocaleAction):
      return { ...state, locale: action.locale };
    default:
      return state;
  }
}
