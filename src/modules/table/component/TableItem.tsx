import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { memo, useState } from 'react';
import { Payroll } from '../redux/reducer';
import moment from 'moment';
import ConfirmationDialog from '../../../Component/ConfirmationDialog';
import { useDispatch } from 'react-redux';
import { deletePayroll } from '../redux/action';
import { setColorStatus } from './ProductDialog';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';
interface PropsTableItem {
  data: Payroll;
}

function TableItem({ data }: PropsTableItem) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClickDetail = () => {};
  const date = moment(data.createdAt).format('DD MMM YYYY');
  function formatCurrency(amount: number): string {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  const handleclose = () => {
    setOpen(false);
  };
  const handleOnYesClick = () => {
    dispatch(deletePayroll(data.id));
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      {open && (
        <ConfirmationDialog
          open={open}
          onConfirmDialogClose={handleclose}
          text="Hãy chọn lựa chọn của bạn"
          title="Xóa dữ liệu"
          onYesClick={handleOnYesClick}
          Yes="Xóa"
          No="Hủy"
        />
      )}
      <tr className="wrapperTableItem ">
        <td style={{ color: setColorStatus(data.status) }}>{data.status}</td>
        <td>{date}</td>
        <td>{data.client}</td>
        <td>{data.currency}</td>
        <td style={{ fontWeight: '700' }}>{formatCurrency(data.total)}</td>
        <td>{data.invoice}</td>
        <td>
          <Link to={`${ROUTES.detail}/${data.id}`}>
            <Button onClick={handleClickDetail} style={{ backgroundColor: '#32abd6', border: 'none' }}>
              Detail
            </Button>
          </Link>
        </td>
        <td style={{ cursor: 'pointer' }} onClick={handleOpen}>
          <FontAwesomeIcon color="#f56a9b" className="ms-4" icon={faTrashCan} />
        </td>
      </tr>
    </>
  );
}

export default memo(TableItem);
