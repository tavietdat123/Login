import { Col, Row } from 'react-bootstrap';
import { Photo } from '../redux/reducer';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState, memo } from 'react';

interface Props {
  data: Photo;
  handleChangeConfirm: (title: string, id: number, xitem?: boolean) => void;
  reset: boolean | null;
  handlech: any;
}
function MenuItem({ data, handleChangeConfirm, reset, handlech }: Props) {
  const title = data.title;
  const [value, setValue] = useState<string>(data.title);
  const [onInput, setOnInput] = useState<boolean>(false);
  const hoverStyle = {
    border: '#555',
  };
  const ref = useRef<any>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === title) {
      handleChangeConfirm(e.target.value, data.id, true);
    } else if (e.target.value !== title) {
      handleChangeConfirm(e.target.value, data.id, false);
    }
    setValue(e.target.value);
  };
  const handleClick = (e: MouseEvent<HTMLLabelElement>) => {
    setOnInput(true);
  };
  useEffect(() => {
    if (onInput === true) {
      ref.current.focus();
    }
  }, [onInput]);
  const handleBlur = () => {
    setOnInput(false);
  };
  useEffect(() => {
    if (reset) {
      setValue(title);
      if (typeof handlech === 'function') handlech();
    }
  }, [reset]);

  return (
    <Row className="mb-4 p-4" style={{ backgroundColor: data.id % 2 === 0 ? '#f0f0f0' : '#fff' }}>
      <Col md={3} className="d-flex justify-content-center">
        <img src={data.thumbnailUrl} style={{ boxShadow: '0px 2px 3px #555' }} width={150} height={150} alt="" />
      </Col>
      <Col md={9}>
        {!onInput && (
          <label
            htmlFor=""
            style={{
              fontSize: '20px',
              fontWeight: '600',
              backgroundColor: data.id % 2 === 0 ? '#f0f0f0' : '#fff',
              cursor: 'text',
              border: '1px solid transparent',
              padding: '5px 0px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = hoverStyle.border;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
            }}
            onClick={handleClick}
          >
            {value}
          </label>
        )}
        {onInput && (
          <input
            className="form-control"
            type="text"
            value={value}
            onChange={handleChange}
            ref={ref}
            onBlur={handleBlur}
            style={{
              border: 'none',
              fontSize: '20px',
              fontWeight: '600',
              backgroundColor: data.id % 2 === 0 ? '#f0f0f0' : '#fff',
            }}
          />
        )}

        <p className="mt-3">{Date.now()}</p>
      </Col>
    </Row>
  );
}

export default memo(MenuItem);
