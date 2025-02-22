import { styled } from "styled-components";

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center; /* Alterado de flex-start para center */
  padding: 30px;
  background: #333; /* Cinza escuro para a caixa do login */
  color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #555;
  background: #444;
  color: white;
  border-radius: 5px;
  font-size: 16px;

  &::placeholder {
    color: #bbb;
  }
`;

export const PasswordContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const PasswordInput = styled(InputField)`
  padding-right: 40px;
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const DrawerInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px); /* Ajustado para evitar sobreposição */
  padding: 40px;
  gap: 20px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;
