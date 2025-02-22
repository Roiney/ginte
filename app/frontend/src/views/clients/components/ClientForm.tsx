import { useState } from "react";
import { FaCalendar, FaEnvelope, FaMapMarkerAlt, FaPhone, FaPlus, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { ClientState, createClient } from "../reducer";

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50px;
  background: #f8f8f8;
`;

const FormContainer = styled.div`
  background: #181818;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
  color: white;
  width: 100%;
  max-width: 950px;  /* Ajustado para maior largura */
  min-height: 250px;
  margin-top: 20px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px; /* Aumentei o espaçamento horizontal entre os inputs */
  flex-wrap: wrap; /* Inputs irão para a linha de baixo se necessário */
  width: 100%;
`;

const InputContainer = styled.div`
  flex: 1;
  position: relative;
  min-width: 250px; /* Evita que os inputs fiquem esmagados */
  margin-bottom: 15px; /* Espaçamento vertical entre as linhas */
`;


const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 1px solid #444;
  border-radius: 5px;
  background: #222;
  color: white;
  font-size: 15px;
  outline: none;
  box-sizing: border-box; /* Evita que padding aumente o tamanho do input */

  &:focus {
    border-color: #66bb6a;
  }

  &::placeholder {
    color: #aaa;
  }
`;



const Icon = styled.div`
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  gap: 10px;
`;

interface ButtonProps {
  primary?: boolean;
  type: "button" | "submit";
  onClick?: () => void;
}

const Button = styled.button<ButtonProps>`
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  background: ${({ primary }) => (primary ? "green" : "#444")};
  color: ${({ primary }) => (primary ? "white" : "#ddd")};

  &:hover {
    background: ${({ primary }) => (primary ? "#0f8a00" : "#555")};
  }
`;



const ClientForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error }: ClientState = useAppSelector((state) => state.client);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({ name: "", email: "", phone: "", birthdate: "", address: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  try {
  const response = await dispatch(createClient(formData));

  if (response.meta.requestStatus === "fulfilled") {
    alert("Usuário cadastrado com sucesso!");
    handleCancel();
    navigate(`/clients`);
  } else {
    // Captura a mensagem de erro retornada pelo Redux Thunk
    const errorMessage = response.payload || "Erro ao cadastrar usuário!";
    alert(`Erro: ${errorMessage}`);
  }
} catch (error: any) {
  // Captura erros inesperados (ex: falha na conexão)
  console.error("Erro inesperado:", error);
  alert("Erro inesperado ao cadastrar usuário. Tente novamente.");
}

  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        {/* Nome e E-mail */}
        <FormRow>
          <InputContainer>
            <Input type="text" name="name" placeholder="Nome *" value={formData.name} onChange={handleChange} />
            <Icon>{FaUser as unknown as JSX.Element}</Icon>
          </InputContainer>
          <InputContainer>
            <Input type="email" name="email" placeholder="E-mail *" value={formData.email} onChange={handleChange} />
            <Icon>{FaEnvelope as unknown as JSX.Element}</Icon>
          </InputContainer>
        </FormRow>

        {/* Telefone e Data de Nascimento */}
        <FormRow>
          <InputContainer>
            <Input type="tel" name="phone" placeholder="Telefone *" value={formData.phone} onChange={handleChange} />
            <Icon>{FaPhone as unknown as JSX.Element}</Icon>
          </InputContainer>
          <InputContainer>
            <Input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
            <Icon>{FaCalendar as unknown as JSX.Element}</Icon>
          </InputContainer>
        </FormRow>

        {/* Endereço */}
        <FormRow>
          <InputContainer>
            <Input type="text" name="address" placeholder="Endereço *" value={formData.address} onChange={handleChange} />
            <Icon>{FaMapMarkerAlt as unknown as JSX.Element}</Icon>
          </InputContainer>
        </FormRow>

        {/* Botões */}
        <ButtonContainer>
          <Button type="button" onClick={handleCancel}>Cancelar</Button>
          <Button type="submit" primary disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"} {FaPlus as unknown as JSX.Element}
          </Button>
        </ButtonContainer>

      </form>
    </FormContainer>
  );
};

export default ClientForm;


