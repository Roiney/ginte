import { InputGroup } from '@blueprintjs/core';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import FormGroup from '../../../components/FormGroup/FormGroup';
import PasswordInputGroup from '../../../components/PasswordInputGroup/PasswordInputGroup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import useToaster from '../../../hooks/useToaster';
import {
  doLogin,
  doValidateUser,
  setEmail,
  setPassword,
} from '../reducer';
import { AuthState, UserRole } from '../types';
import { ButtonGroup, ButtonsContainer, FormContainer } from './styles';

const LoginForm = () => {
  const { showErrorMessage } = useToaster();
  const dispatch = useAppDispatch();
  const { isLoading, data }: AuthState = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    const response = await dispatch(
      doLogin({
        email: data.email,
        password: data.password,
      }),
    );

    if (response.meta.requestStatus === 'rejected') {
      showErrorMessage('Error on login');
    } else {
      const user = await dispatch(doValidateUser()).unwrap();
      if (user?.role === UserRole.ADMINISTRATOR) {
        navigate('/');
      } else {
        navigate('/');
      }
    }
  }, [dispatch, data.email, data.password, showErrorMessage, navigate]);

  const updateEmail = useCallback(
    (val: string) => {
      dispatch(setEmail(val));
    },
    [dispatch],
  );
  const updatePassword = useCallback(
    (val: string) => {
      dispatch(setPassword(val));
    },
    [dispatch],
  );



  const canLogin = useMemo(
    () => data.email && data.password,
    [data.email, data.password],
  );

  return (
    <FormContainer>
      <FormGroup label="E-mail" labelFor="email-input" fill>
        <InputGroup
          id="email-input"
          placeholder="Enter your e-mail"
          type="email"
          autoComplete="email"
          value={data.email}
          onChange={(e) => updateEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup label="Password" labelFor="password-input" fill>
        <PasswordInputGroup
          id="password-input"
          placeholder="Enter your password"
          type="password"
          autoComplete="current-password"
          value={data.password}
          onChange={(e) => updatePassword(e.target.value)}
        />
      </FormGroup>
      <ButtonsContainer>
        <ButtonGroup>
          <Button
            // icon="log-in"
            loading={isLoading}
            onClick={handleLogin}
            // fill
            disabled={!canLogin}
          >
            Login
          </Button>
        </ButtonGroup>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default LoginForm;
