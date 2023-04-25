import { ChangeEvent, MouseEvent, useEffect, useRef } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoUser, logout, updateAvatar } from '../redux/actionProfile';
import { infoUserSelector } from '../redux/seletorProfile';
import moment from 'moment';
import CustomDialog from '../../../Component/Dialog';
import { useState, useCallback } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ConfirmationDialog from '../../../Component/ConfirmationDialog';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY, APIUrl } from '../../../utils/constants';
import { replace } from 'connected-react-router';
import { generateAvatarUpload } from '../../../utils/upload';

function ProfilePage() {
  const [modal, setModal] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, width: 0, height: 0, unit: 'px' });
  const [complete, setComplete] = useState<any>(null);
  const [base64, setBase64] = useState('');
  const dispatch = useDispatch();
  const imgCurrent = useRef<any>(null);
  const infoUser = useSelector(infoUserSelector);
  const imageRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<any>(null);
  const defaultImage = 'https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg';
  useEffect(() => {
    dispatch(getInfoUser());
  }, [dispatch]);
  const date = moment(infoUser.createdAt).format('DD MMM YYYY');
  const handleClickShowModal = (e: MouseEvent<HTMLInputElement>) => {
    if (imageRef.current !== null) imageRef.current.click();
  };
  const handleCloseModal = useCallback(() => {
    setModal(false);
    setBase64('');
  }, []);
  const handleCancelLogOut = useCallback(() => {
    setLogOut(false);
  }, []);
  const handleOnLogOut = useCallback(() => {
    setLogOut(true);
  }, []);
  const handleConfirmLogOut = useCallback(() => {
    setLogOut(false);
    Cookies.remove(ACCESS_TOKEN_KEY);
    dispatch(logout());
    dispatch(replace('/'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const reader = new FileReader();
    if (files !== null && files.length) reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setBase64(reader.result as any);
      setModal(true);
    };
  };
  const handleSaveImg = async () => {
    const file = await generateAvatarUpload(previewCanvasRef.current, complete);
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      dispatch(updateAvatar(formData));
      setModal(false);
    }
  };
  useEffect(() => {
    if (!complete || !base64 || !imgCurrent) {
      return;
    }

    const image = imgCurrent.current;
    const canvas = previewCanvasRef.current;
    const crop = complete;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete]);
  return (
    <Container
      fluid
      style={{
        backgroundImage: 'url(https://wallpaperaccess.com/full/6259661.jpg)',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <CustomDialog
        open={modal}
        yes="Lưu"
        no="Hủy"
        onClose={handleCloseModal}
        onYesClick={handleSaveImg}
        onConfirmDialogClose={handleCloseModal}
        textTitle="Chỉnh sửa ảnh"
        size="md"
        maxWidth
      >
        <div className="d-flex ">
          <Col md={6}>
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => {
                setComplete(c);
              }}
              aspect={1}
            >
              <img src={base64} ref={imgCurrent} alt="" />
            </ReactCrop>
          </Col>
          <Col md={5} className="d-flex align-items-center justify-content-center ms-5" style={{ borderRadius: '' }}>
            <canvas style={{ width: '90%', borderRadius: '50%' }} ref={previewCanvasRef}></canvas>
          </Col>
        </div>
      </CustomDialog>
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
          <div className="d-flex justify-content-center">
            <div style={{ width: '150px', height: '150px', position: 'relative' }}>
              <img
                className="w-100 overflow-hidden"
                style={{ borderRadius: '50%' }}
                src={infoUser.avatar ? `${APIUrl}/${infoUser.avatar}` : defaultImage}
                alt=""
              />
              <div
                className="d-flex justify-content-center align-items-center hover_op "
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  textAlign: 'center',
                  fontSize: '14px',
                  color: 'white',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  borderRadius: '50%',
                  lineHeight: 1.8,
                }}
                onClick={handleClickShowModal}
              >
                <input ref={imageRef} onChange={handleChangeImage} type="file" hidden accept="image/*" />
                <span style={{ fontWeight: 600, width: '50%', textTransform: 'uppercase' }}>UPLOAD Avatar</span>
              </div>
            </div>
          </div>
          <Row className="mt-4 p-3 pb-0">
            <Col className="mt-3" md="6">
              Email: <span style={{ fontWeight: '600', fontSize: '16px' }}>{infoUser.email}</span>
            </Col>
            <Col className="mt-3" md="6">
              Name: <span style={{ fontWeight: '600', fontSize: '16px' }}>{infoUser.name}</span>
            </Col>
            <Col className="mt-3" md="6">
              Giới tính: <span style={{ fontWeight: '600', fontSize: '16px' }}>{infoUser.gender}</span>
            </Col>
            <Col className="mt-3" md="6">
              Ngày đăng kí: <span style={{ fontWeight: '600', fontSize: '16px' }}>{date}</span>
            </Col>
            <Col className="mt-4 d-flex justify-content-center align-items-center" md="12">
              {logOut && (
                <ConfirmationDialog
                  open={logOut}
                  onConfirmDialogClose={handleCancelLogOut}
                  text="Hãy chọn một lựa chọn"
                  title="Đăng xuất"
                  onYesClick={handleConfirmLogOut}
                  Yes="Đăng xuất"
                  No="Huỷ"
                />
              )}
              <Button onClick={handleOnLogOut} style={{ minWidth: '200px' }}>
                Log out
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
