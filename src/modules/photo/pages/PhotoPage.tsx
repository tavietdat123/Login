import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { confirmAction, getPhoto } from '../redux/action';

import { AppState } from '../../../redux/reducer/reducer';
import MenuItem from './MenuItem';
export interface SwithTitle {
  title: string;
  id: number;
}

function Photo() {
  const [reset, setReset] = useState<boolean>(false);
  const [swithTitle, setSwithTitle] = useState<Array<SwithTitle>>([]);
  const dispatch = useDispatch();
  const listPhoto = useSelector((state: AppState) => state.photo.listPhoto);
  const loading = useSelector((state: AppState) => state.photo.loading);
  const hasMore = useSelector((state: AppState) => state.photo.hasMore);
  const count = useRef<number>(1);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight + 2 >= scrollHeight && !loading && hasMore) {
      const prev = count.current;
      count.current = count.current + 10;
      dispatch(getPhoto(prev, count.current));
    }
  };
  const handleChangeConfirm = useCallback((title: string, id: number, xitem?: boolean) => {
    setSwithTitle((prev) => {
      const check = prev.some((el) => {
        return el.id === id;
      });

      if (check && !xitem) {
        const newData: SwithTitle[] = prev.map((el) => {
          if (id === el.id) {
            return {
              ...el,
              title: title,
            };
          }
          return el;
        });
        return newData;
      } else if (!xitem) {
        return [...prev, { id, title }];
      } else {
        return prev.filter((el) => el.id !== id);
      }
    });
  }, []);

  const handleClickConfirm = () => {
    const confifmed = window.confirm('Bạn có chắc muốn lưu thông tin này không');
    if (confifmed) {
      dispatch(confirmAction(swithTitle));
      setSwithTitle([]);
    }
  };
  const handleReset = () => {
    setReset(true);
  };
  const handlech = useCallback(() => {
    setReset(false);
    setSwithTitle([]);
  }, []);
  useEffect(() => {
    dispatch(getPhoto(count.current, count.current + 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // Thêm sự kiện lắng nghe cuộn trang
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container fluid style={{ width: '100%', minHeight: '100vh' }}>
      <Row className="d-flex justify-content-center" style={{ width: '100%' }}>
        <Col md={7} className="m-4">
          <div style={{ border: '1px solid #f0f0f0', padding: '30px', borderRadius: '6px' }}>
            <div className="d-flex justify-content-center flex-column">
              <div className="d-flex justify-content-center mb-4" style={{ position: 'sticky', top: '20px' }}>
                <Button
                  className="me-4"
                  style={{ minWidth: '200px', minHeight: '40px', boxShadow: '0px 2px 3px #555' }}
                  disabled={swithTitle.length === 0}
                  onClick={handleClickConfirm}
                >
                  Confirm
                </Button>
                <Button
                  disabled={swithTitle.length === 0}
                  onClick={handleReset}
                  color="warn"
                  style={{ minWidth: '200px', boxShadow: '0px 2px 3px #555' }}
                >
                  Reset
                </Button>
              </div>
              {listPhoto.map((data, index) => {
                const check = swithTitle.some((el) => {
                  return el.id === data.id;
                });
                if (check) {
                  return (
                    <Fragment key={index}>
                      <MenuItem
                        data={data}
                        reset={reset}
                        handlech={handlech}
                        handleChangeConfirm={handleChangeConfirm}
                      />
                    </Fragment>
                  );
                }
                return (
                  <Fragment key={index}>
                    <MenuItem data={data} reset={null} handlech={null} handleChangeConfirm={handleChangeConfirm} />
                  </Fragment>
                );
              })}
              {loading && (
                <div className="d-flex justify-content-center mt-4" style={{ height: '50px' }}>
                  <div className="shapes"></div>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Photo;
