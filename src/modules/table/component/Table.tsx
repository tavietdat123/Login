import { Col, Row } from 'react-bootstrap';
import TableItem from './TableItem';
import { useSelector } from 'react-redux';
import { LoadingFilterSelector, payrollRemaining } from '../redux/selector';
import { memo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
function Table() {
  const listPayroll = useSelector(payrollRemaining);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const loading = useSelector(LoadingFilterSelector);
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };
  const pageCount = Math.ceil(listPayroll.length / 10); // Số lượng trang
  const displayItems = listPayroll.slice(currentPage * 10, (currentPage + 1) * 10);

  return (
    <Row className="mt-4">
      <Col md={12}>
        <table className="w-100">
          <thead>
            <tr style={{ color: '#355361', fontSize: '18px', letterSpacing: '1px' }}>
              <th>Status</th>
              <th>Date</th>
              <th>Client</th>
              <th>Currency</th>
              <th>Total</th>
              <th>Invoice</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayItems.map((el) => (
              <TableItem key={el.id} data={el} />
            ))}
            {loading && (
              <tr>
                <td className="d-flex justify-content-center mt-2 w-100" style={{ height: '50px' }}>
                  <div className="shapes"></div>
                </td>
              </tr>
            )}
            {listPayroll.length === 0 && (
              <tr>
                <td className="d-flex justify-content-center mt-2 w-100" style={{ height: '50px' }}>
                  Không có dữ liệu nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="d-flex justify-content-between mt-4">
          <div style={{ fontWeight: 600 }}>
            Showing <span style={{ fontWeight: 700 }}>{listPayroll.length < 10 ? listPayroll.length : 10}</span> from{' '}
            <span style={{ fontWeight: 700 }}>{listPayroll.length}</span> data
          </div>
          <ReactPaginate
            previousLabel={<FontAwesomeIcon icon={faAnglesLeft} />}
            nextLabel={
              <FontAwesomeIcon className={currentPage + 1 === pageCount ? 'disable' : ''} icon={faAnglesRight} />
            }
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active_number'}
            pageClassName={'number'}
            previousClassName={'previous-button'}
            nextClassName={'next-button'}
          />
        </div>
      </Col>
    </Row>
  );
}

export default memo(Table);
