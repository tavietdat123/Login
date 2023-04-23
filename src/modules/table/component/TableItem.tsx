import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { memo, useState } from 'react';
import { Payroll } from '../redux/reducer';
import moment from 'moment';
import ConfirmationDialog from '../../../Component/ConfirmationDialog';
import { useDispatch } from 'react-redux';
import { deletePayroll } from '../redux/action';
interface PropsTableItem {
  data: Payroll;
}
function TableItem({ data }: PropsTableItem) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
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
  const date = moment(data.date).format('DD MMM YYYY');
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
        <td style={{ color: color(data.status) }}>{data.status}</td>
        <td>{date}</td>
        <td>{data.client}</td>
        <td>{data.currentcy}</td>
        <td style={{ fontWeight: '700' }}>{formatCurrency(data.tolal)}</td>
        <td>{data.invoice}</td>
        <td style={{ cursor: 'pointer' }} onClick={handleOpen}>
          <FontAwesomeIcon color="#f56a9b" className="ms-4" icon={faTrashCan} />
        </td>
      </tr>
    </>
  );
}

export default memo(TableItem);
