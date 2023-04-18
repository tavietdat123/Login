import { Controller, useForm } from 'react-hook-form';
import { ILoginParams } from '../../../models/auth';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRegion, getState, setErrorMessge } from '../../../redux/actions/actionSignUp';
import { regionSelector, stateSelector } from '../../../redux/selector/SigupSelector';
import SwitchLanguage from './SwitchLanguage';

// import { language } from './SwitchLanguage';
interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}
export interface FormData {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region: number;
  state: number;
}
export interface Region {
  createdAt: string;
  id: number;
  name: string;
  pid: null;
}
export interface State {
  createdAt: string;
  id: number;
  name: string;
  pid: number;
}
const gender = [
  {
    gender: 'Nam',
  },
  {
    gender: 'Nữ',
  },
  {
    gender: 'Bê đê nữ',
  },
  {
    gender: 'Bê đê nam',
  },
];
interface Gender {
  gender: string;
}

function SignUpForm({ onLogin, loading, errorMessage }: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRegion());
    dispatch(setErrorMessge());
  }, [dispatch]);
  const region = useSelector(regionSelector) ?? [];
  const state = useSelector(stateSelector) ?? [];
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    onLogin(data);
  };
  const currentRegion = watch('region');
  useEffect(() => {
    if (currentRegion) {
      dispatch(getState(currentRegion));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRegion]);
  const password = watch('password');

  return (
    <div className="mt-2 mb-5" style={{ maxWidth: '560px', width: '100%' }}>
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}
      <SwitchLanguage />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={12}>
            <label className="form-check-label" htmlFor="invalidCheck">
              <FormattedMessage id="email" />
            </label>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              rules={{ required: true, pattern: /^\S+@\S+$/i }}
              render={({ field }) => <Form.Control className="mt-2" {...field} isInvalid={!!errors.email} />}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.email?.type === 'required' && <FormattedMessage id="require" />}
              {errors.email?.type === 'pattern' && <FormattedMessage id="emailInvalid" />}
            </span>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="form-check-label mt-3" htmlFor="invalidCheck">
              <FormattedMessage id="password" />
            </label>
            <Controller
              name="password"
              defaultValue=""
              control={control}
              rules={{ required: true, minLength: 4 }}
              render={({ field }) => (
                <Form.Control className="mt-2" {...field} type="password" isInvalid={!!errors.password} />
              )}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.password?.type === 'required' && <FormattedMessage id="require" />}
              {errors.password?.type === 'minLength' && <FormattedMessage id="minPasswordInvalid" />}
            </span>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="form-check-label mt-3" htmlFor="invalidCheck">
              <FormattedMessage id="repeatPassword" />
            </label>
            <Controller
              name="repeatPassword"
              defaultValue=""
              control={control}
              rules={{
                required: true,
                validate: (value) => value === password,
              }}
              render={({ field }) => (
                <Form.Control className="mt-2" {...field} type="password" isInvalid={!!errors.repeatPassword} />
              )}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.repeatPassword?.type === 'required' && <FormattedMessage id="require" />}
              {errors.repeatPassword?.type === 'validate' && <FormattedMessage id="passWordNotMatch" />}
            </span>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <label className="form-check-label mt-3" htmlFor="invalidCheck">
              <FormattedMessage id="fullName" />
            </label>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Form.Control className="mt-2" {...field} isInvalid={!!errors.name} />}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.name?.type === 'required' && <FormattedMessage id="require" />}
            </span>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <label className="form-check-label mt-3" htmlFor="invalidCheck">
              <FormattedMessage id="sex" />
            </label>
            <Controller
              name="gender"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Select className="mt-2" {...field} isInvalid={!!errors.gender}>
                  <option value="">--Nhập một lựa chọn--</option>
                  {gender.map((el: Gender, index: number) => {
                    return (
                      <option key={index} value={el.gender}>
                        {el.gender}
                      </option>
                    );
                  })}
                </Form.Select>
              )}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.gender?.type === 'required' && <FormattedMessage id="require" />}
            </span>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <label className="form-check-label mt-3" htmlFor="invalidCheck">
              <FormattedMessage id="region" />
            </label>
            <Controller
              name="region"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Select className="mt-2" {...field} isInvalid={!!errors.region}>
                  <option value="">--Nhập một lựa chọn--</option>
                  {region.map((el: Region) => {
                    return (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
                </Form.Select>
              )}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.region?.type === 'required' && <FormattedMessage id="require" />}
            </span>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <label className="form-check-label mt-3" htmlFor="invalidCheck">
              <FormattedMessage id="city" />
            </label>
            <Controller
              name="state"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Form.Select disabled={!currentRegion} className="mt-2" {...field} isInvalid={!!errors.state}>
                    <option value="">--Nhập một lựa chọn--</option>
                    {state.map((el: State) => {
                      return (
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                );
              }}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.state?.type === 'required' && <FormattedMessage id="require" />}
            </span>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="d-flex justify-content-center mt-4">
            <Button
              style={{ minWidth: '200px' }}
              className="d-flex align-items-center justify-content-center"
              type="submit"
              disabled={loading}
            >
              {loading && <div className="spinner me-2"></div>}
              <FormattedMessage id="signUp" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="d-flex justify-content-center mt-3">
            <FormattedMessage id="login" />{' '}
            <Link to={ROUTES.login}>
              <FormattedMessage id="register" />{' '}
            </Link>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default SignUpForm;
