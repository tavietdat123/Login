import { ChangeEvent, memo } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setLocale } from '../../intl/redux/intlReducer';
import { LS_LANG } from '../../intl/constants';

export const language = [
  { title: 'Việt Nam', code: 'vi' },
  { title: 'English', code: 'en' },
];

function SwitchLanguage() {
  const dispatch = useDispatch();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocale(e.target.value));
  };
  const currentLaguage: any = localStorage.getItem(LS_LANG);
  return (
    <Form.Select
      style={{ position: 'fixed', top: '30px', right: '30px', width: '120px', fontSize: '14px' }}
      aria-label="Default select example"
      onChange={handleChange}
      defaultValue={currentLaguage}
    >
      {language.map((el, index) => (
        <option key={index} value={el.code}>
          {el.title}
        </option>
      ))}
    </Form.Select>
  );
}
export default memo(SwitchLanguage);
