import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import FilterComponent from '../component/FilterComponent';
import Table from '../component/Table';
import setUpSever from '../../../fakeApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPayroll } from '../redux/action';
setUpSever();

function Filter() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPayroll());
  }, [dispatch]);
  return (
    <Container fluid>
      <Row className="w-100 d-flex justify-content-center align-items-center mt-3">
        <Col md={8} className="p-4 " style={{ backgroundColor: '#f6f7fb', borderRadius: '10px' }}>
          <Row className="mb-3">
            <Col md={12}>
              <h3>
                <FormattedMessage id="PayrollTransactionsList" />
              </h3>
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
