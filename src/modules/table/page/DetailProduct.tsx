import { useEffect, useState, useCallback } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getCurrentProduct } from '../redux/action';
import { currentProductSelector } from '../redux/selector';
import ProductDialog, { setColorStatus } from '../component/ProductDialog';

function DetailProduct() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { id } = useParams<any>();
  const currentProduct = useSelector(currentProductSelector);
  const handleOpen = () => {
    setModal(true);
  };
  console.log(currentProduct);
  console.log(currentProduct);
  const handleClose = useCallback(() => {
    setModal(false);
  }, []);
  useEffect(() => {
    dispatch(getCurrentProduct(+id));
    console.log('qưeqwe');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { client, status, fundingMethod, total, currency, order, invoice } = currentProduct;
  return (
    <Container
      fluid
      style={{
        backgroundImage: 'url(https://wallpaperaccess.com/full/701802.jpg)',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      {modal && <ProductDialog open={modal} onClose={handleClose} isEdit={true} />}
      <Row style={{ minHeight: '100vh' }} className="w-100  d-flex justify-content-center align-items-center">
        <Col
          md={5}
          className="p-4 pt-4 pb-5"
          style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 2px 5px #888',
            border: '1px solid #ccc',
          }}
        >
          <div className="mt-3 ms-4">
            Client:{' '}
            <span style={{ fontWeight: 700 }} className="ms-2">
              {client}
            </span>
          </div>
          <div className="mt-3 ms-4">
            Status:{' '}
            <span style={{ color: setColorStatus(status), fontWeight: 700 }} className="ms-2">
              {status}
            </span>
          </div>
          <div className="mt-3 ms-4">
            Currency:{' '}
            <span style={{ fontWeight: 700 }} className="ms-2">
              {currency}
            </span>
          </div>
          <div className="mt-3 ms-4">
            Funding method:{' '}
            <span style={{ fontWeight: 700 }} className="ms-2">
              {fundingMethod}
            </span>
          </div>
          <div className="mt-3 ms-4">
            Total:{' '}
            <span style={{ fontWeight: 700 }} className="ms-2">
              {total}
            </span>
          </div>
          <div className="mt-3 ms-4">
            Order:{' '}
            <span style={{ fontWeight: 700 }} className="ms-2">
              {order}
            </span>
          </div>
          <div className="mt-3 ms-4">
            invoice:{' '}
            <span style={{ fontWeight: 700 }} className="ms-2">
              {invoice}
            </span>
          </div>
          <Col md={12} className="d-flex justify-content-center mt-4">
            <Button onClick={handleOpen}>Chỉnh sửa</Button>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailProduct;
