import { Button, Col, Form, Row } from 'react-bootstrap';
import CustomDialog from '../../../Component/Dialog';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addPayroll, editPayroll } from '../redux/action';
import { currentProductSelector } from '../redux/selector';
interface CreateProductDialogProps {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
}
export interface FormDataCreateProduct {
  status: string;
  currency: string;
  fundingMethod: string;
  total: number;
  order: string;
  client: string;
  invoice: string;
}
export interface FormDataEditProduct extends FormDataCreateProduct {
  id: number;
}
const statusConstant = ['Fulfilled', 'Processing', 'Pending', 'Received'];
export const setColorStatus = (data: string) => {
  const newData = data.toLowerCase();
  if (newData.includes('fulfilled')) {
    return '#54b291';
  } else if (newData.includes('processing')) {
    return '#ffdcab';
  } else if (newData.includes('received')) {
    return '#4faece';
  } else {
    return '#555';
  }
};
function ProductDialog({ open, onClose, isEdit }: CreateProductDialogProps) {
  const dispatch = useDispatch();
  const currentData = useSelector(currentProductSelector);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataCreateProduct>();
  const onSubmit = (data: FormDataCreateProduct) => {
    if (isEdit) {
      const newData = { ...data, id: currentData.id };
      dispatch(editPayroll(newData));
    } else {
      dispatch(addPayroll(data));
    }
    onClose();
  };

  const required = 'Bạn buộc phải nhập trường này';
  return (
    <CustomDialog
      open={true}
      onClose={onClose}
      onConfirmDialogClose={onClose}
      textTitle={isEdit ? 'Chỉnh sửa sản phẩm' : 'Tạo sản phẩm mới'}
      size="md"
      maxWidth={true}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="mt-2" md={6}>
            {' '}
            <label className="form-check-label" htmlFor="invalidCheck">
              Client
            </label>
            <Controller
              name="client"
              defaultValue={isEdit ? currentData.client : ''}
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Form.Control className="mt-1" {...field} isInvalid={!!errors.client} />}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.client?.type === 'required' && <span>{required}</span>}
            </span>
          </Col>
          <Col className="mt-2" md={6}>
            {' '}
            <label className="form-check-label" htmlFor="invalidCheck">
              Status
            </label>
            <Controller
              name="status"
              defaultValue={isEdit ? currentData.status : ''}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Select className="mt-1" {...field} isInvalid={!!errors.status}>
                  <option value="">--Nhập một lựa chọn--</option>
                  {statusConstant.map((el, index) => {
                    return (
                      <option style={{ color: setColorStatus(el) }} key={index} value={el.toUpperCase()}>
                        {el}
                      </option>
                    );
                  })}
                </Form.Select>
              )}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.status?.type === 'required' && <span>{required}</span>}
            </span>
          </Col>
          <Col className="mt-2" md={6}>
            {' '}
            <label className="form-check-label" htmlFor="invalidCheck">
              Currency
            </label>
            <Controller
              name="currency"
              defaultValue={isEdit ? currentData.currency : ''}
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Form.Control className="mt-1" {...field} isInvalid={!!errors.currency} />}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.currency?.type === 'required' && <span>{required}</span>}
            </span>
          </Col>
          <Col md={6}>
            {' '}
            <label className="form-check-label" htmlFor="invalidCheck">
              Funding method
            </label>
            <Controller
              name="fundingMethod"
              defaultValue={isEdit ? currentData.fundingMethod : ''}
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Form.Control className="mt-1" {...field} isInvalid={!!errors.fundingMethod} />}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.fundingMethod?.type === 'required' && <span>{required}</span>}
            </span>
          </Col>
          <Col className="mt-2" md={6}>
            {' '}
            <label className="form-check-label" htmlFor="invalidCheck">
              Total
            </label>
            <Controller
              name="total"
              control={control}
              defaultValue={isEdit ? currentData.total : undefined}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Control className="mt-1" type="number" {...field} isInvalid={!!errors.total} />
              )}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.total?.type === 'required' && <span>{required}</span>}
            </span>
          </Col>
          <Col className="mt-2" md={6}>
            {' '}
            <label className="form-check-label" htmlFor="invalidCheck">
              Order
            </label>
            <Controller
              name="order"
              defaultValue={isEdit ? currentData.order : ''}
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Form.Control className="mt-1" {...field} isInvalid={!!errors.order} />}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.order?.type === 'required' && <span>{required}</span>}
            </span>
          </Col>
          <Col className="mt-2" md={12}>
            {' '}
            <label className="form-check-label" htmlFor="invalidCheck">
              Invoice
            </label>
            <Controller
              name="invoice"
              defaultValue={isEdit ? currentData.invoice : ''}
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Form.Control className="mt-1" {...field} isInvalid={!!errors.invoice} />}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.invoice?.type === 'required' && <span>{required}</span>}
            </span>
          </Col>
          <Col md={12} className="d-flex justify-content-between mt-3">
            <div></div>
            <div>
              <Button onClick={onClose} className="btn btn-danger">
                Hủy
              </Button>
              <Button type="submit" className="btn btn-success ms-3">
                Lưu
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    </CustomDialog>
  );
}

export default ProductDialog;
