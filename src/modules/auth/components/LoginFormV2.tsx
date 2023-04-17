import { Controller, useForm } from 'react-hook-form';
import { ILoginParams } from '../../../models/auth';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}
interface FormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

function LoginFormV2({ onLogin, loading, errorMessage }: Props) {
  const info = () => {
    const infoLogin = localStorage.getItem('info-login');
    if (infoLogin) {
      return JSON.parse(infoLogin);
    } else {
      return { email: '', password: '', rememberMe: false };
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    onLogin(data);
  };
  const { email, password, rememberMe } = info();
  return (
    <div className="mt-2 mb-5" style={{ maxWidth: '560px', width: '100%' }}>
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={12}>
            <label className="form-check-label" htmlFor="invalidCheck">
              <FormattedMessage id="email" />
            </label>
            <Controller
              name="email"
              defaultValue={email}
              control={control}
              rules={{ required: true, pattern: /^\S+@\S+$/i }}
              render={({ field }) => <Form.Control className="mt-2" {...field} isInvalid={!!errors.email} />}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.email?.type === 'required' && <FormattedMessage id="emailRequire" />}
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
              defaultValue={password}
              control={control}
              rules={{ required: true, minLength: 4 }}
              render={({ field }) => (
                <Form.Control className="mt-2" {...field} type="password" isInvalid={!!errors.password} />
              )}
            />
            <span className="text-danger mt-2 d-block " style={{ fontSize: '14px' }}>
              {errors.password?.type === 'required' && <FormattedMessage id="passwordRequire" />}
              {errors.password?.type === 'minLength' && <FormattedMessage id="minPasswordInvalid" />}
            </span>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Controller
              name="rememberMe"
              control={control}
              defaultValue={rememberMe}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <Form.Check
                    className="mt-3"
                    type="checkbox"
                    label={<FormattedMessage id="rememberMe" />}
                    onChange={(e) => onChange(e.target.checked)}
                    onBlur={onBlur}
                    checked={value}
                    isInvalid={!!errors.rememberMe}
                  />
                );
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="d-flex justify-content-center mt-4">
            <Button
              style={{ minWidth: '200px' }}
              className="d-flex align-items-center justify-content-center"
              type="submit"
            >
              {loading && <div className="spinner me-2"></div>}
              <FormattedMessage id="register" />
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default LoginFormV2;
