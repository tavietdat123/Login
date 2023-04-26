import { Button, Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import FilterComponent from '../component/FilterComponent';
import Table from '../component/Table';
// import setUpSever from '../../../fakeApi';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPayroll } from '../redux/action';
import ProductDialog from '../component/ProductDialog';

// setUpSever();

function Filter() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const handleClose = useCallback(() => {
    setModal(false);
  }, []);
  const handleOpen = () => {
    setModal(true);
  };
  useEffect(() => {
    dispatch(getPayroll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container fluid>
      <Row className="w-100 d-flex justify-content-center align-items-center mt-3">
        <Col md={8} className="p-4 " style={{ backgroundColor: '#f6f7fb', borderRadius: '10px' }}>
          <Row className="mb-3">
            <Col md={12} className="d-flex justify-content-between">
              <h3>
                <FormattedMessage id="PayrollTransactionsList" />
              </h3>
              <Button onClick={handleOpen} className="btn-primary">
                Tạo mới
              </Button>
              {modal && <ProductDialog open={modal} onClose={handleClose} />}
            </Col>
          </Row>
          <FilterComponent />
          <Table />
        </Col>
      </Row>
    </Container>
  );
}

export default Filter;
