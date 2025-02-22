import { useState } from "react";
import { FaCalendar, FaEnvelope, FaMapMarkerAlt, FaPhone, FaPlus, FaUser } from "react-icons/fa";
import styled from "styled-components";

const FormContainer = styled.div`
  background: #181818;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
  color: white;
  max-width: 700px;
  margin: auto;
`;

const FormRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  flex: 1;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 40px 12px 12px;
  border: none;
  border-radius: 5px;
  background: #222;
  color: white;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: #aaa;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 10px;
`;

interface ButtonProps {
  primary?: boolean;
  type: "button" | "submit";
  onClick?: () => void;
}

const Button = styled.button<ButtonProps>`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  background: ${({ primary }) => (primary ? "green" : "#444")};
  color: ${({ primary }) => (primary ? "white" : "#ddd")};

  &:hover {
    background: ${({ primary }) => (primary ? "#0f8a00" : "#555")};
  }
`;

const ClientForm = () => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Cadastro enviado:", formData);
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
          <Button type="submit" primary>
            Cadastrar {FaPlus as unknown as JSX.Element}
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default ClientForm;
