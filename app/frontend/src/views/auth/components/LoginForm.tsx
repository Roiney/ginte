import { InputGroup } from '@blueprintjs/core';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import logo from "../../../assets/genti.png"; // Ajuste o caminho para o logo correto
import Button from '../../../components/Button/Button';
import FormGroup from '../../../components/FormGroup/FormGroup';
import PasswordInputGroup from '../../../components/PasswordInputGroup/PasswordInputGroup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import useToaster from '../../../hooks/useToaster';
import { CLIENTS } from '../../clients/routes';
import {
  doLogin,
  doValidateUser,
  setEmail,
  setPassword,
} from '../reducer';
import { AuthState } from '../types';

// Estilo Global
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial, sans-serif;
    background: #f5f5f5;
    color: white;
  }
`;

// Wrapper Principal para Centralização
export const DrawerInnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

// Wrapper para dividir Formulário e Logo
export const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 800px; /* Ajusta a largura máxima */
  width: 100%;
  background: #333;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

// Container do Formulário (Alinhado à Esquerda)
export const FormContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: flex-start; /* Alinha os inputs à esquerda */
`;

// Container do Logo (Alinhado à Direita)
export const LogoContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Estilo do Logo
export const Logo = styled.img`
  max-width: 150px; /* Ajuste o tamanho conforme necessário */
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

// Estilo para os Inputs
export const InputField = styled.input`
  width: 100%;
  height: 50px; /* Defini uma altura fixa maior */
  padding: 15px; /* Mais espaçamento interno */
  border: 1px solid #555;
  background: #444;
  color: white;
  border-radius: 5px;
  font-size: 18px; /* Fonte maior */

  &::placeholder {
    color: #bbb;
  }
`;
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
      if (user) {
        navigate(CLIENTS());
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
    <>
      <GlobalStyle />
      <DrawerInnerWrapper>
        <FormWrapper>
          {/* Formulário à Esquerda */}
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
            <ButtonGroup>
              <Button loading={isLoading} onClick={handleLogin} disabled={!canLogin}>
                Login
              </Button>
            </ButtonGroup>
          </FormContainer>

          {/* Logo à Direita */}
          <LogoContainer>
            <Logo src={logo} alt="Logo da Empresa" />
          </LogoContainer>
        </FormWrapper>
      </DrawerInnerWrapper>
    </>
  );
};

export default LoginForm;
