import { Col, Row } from 'react-bootstrap';
import './FilterComponent.scss';
import { memo, useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clientSelector, statusSelector } from '../redux/selector';
import { toast } from 'react-toastify';
import { getFilter } from '../redux/action';
export interface FormData {
  client: string;
  status: string;
  dateFrom: string;
  dateTo: string;
  invoice: string;
}
function FilterComponent() {
  const [formData, setFormData] = useState<FormData>({
    client: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    invoice: '',
  });
  const { client, status, dateFrom, dateTo, invoice } = formData;
  const clientList = useSelector(clientSelector);
  const statusList = useSelector(statusSelector);
  const dispatch = useDispatch();
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    setFormData({
      client: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      invoice: '',
    });
    dispatch(
      getFilter({
        client: '',
        status: '',
        dateFrom: '',
        dateTo: '',
        invoice: '',
      }),
    );
  };
  const color = (data: string) => {
    if (data === 'Pending') {
      return '#555';
    } else if (data === 'Fulfilled') {
      return '#54b291';
    } else if (data === 'Processing') {
      return '#ffdcab';
    } else if (data === 'Received') {
      return '#4faece';
    }
  };
  const handleSearch = () => {
    const date1 = new Date(dateFrom);
    const date2 = new Date(dateTo);
    const dateNow = new Date();
    if (!client && !status && !dateFrom && !dateTo && !invoice) {
      toast.warn('Bạn cần nhập ít nhất 1 trường');
      return;
    } else if ((dateFrom && !dateTo) || (!dateFrom && dateTo)) {
      toast.warn('Bạn cần nhập 2 trường thời gian');
      return;
    } else if (date1 > date2) {
      toast.warn('Bạn cần nhập thời gian trường 1 trước trường 2');
      return;
    } else if (date2 > dateNow) {
      toast.warn('Bạn không được nhập sau thời gian hiện tại');
      return;
    } else {
      dispatch(getFilter(formData));
    }
  };

  return (
    <Row>
      <Col md={9}>
        <div className="d-flex justify-content-between">
          <select name="client" value={client} onChange={handleChangeSelect} className="input">
            <option value="">Client</option>
            {clientList.map((el, index) => {
              return (
                <option key={index} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
          <select value={status} name="status" onChange={handleChangeSelect} className="input">
            <option value="">Status</option>
            {statusList.map((el, index) => {
              return (
                <option key={index} style={{ color: color(el) }} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
          <input
            className="input"
            onChange={handleChangeInput}
            value={dateFrom}
            name="dateFrom"
            placeholder="Chọn ngày"
            type="date"
          />
          <input
            className="input "
            onChange={handleChangeInput}
            value={dateTo}
            name="dateTo"
            placeholder="from"
            type="date"
          />
          <input
            className="input"
            onChange={handleChangeInput}
            value={invoice}
            name="invoice"
            placeholder="#Invoice"
            type="text"
          />
        </div>
      </Col>
      <Col md={3}>
        <div className="d-flex ">
          <button className="btn_filter" onClick={handleSearch}>
            Apply
          </button>
          <button className="btn_filter" onClick={handleClear}>
            Clear
          </button>
        </div>
      </Col>
    </Row>
  );
}

export default memo(FilterComponent);
