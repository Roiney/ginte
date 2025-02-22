import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../../hooks";
import { Client, updateClient } from "../reducer";

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


const ClientFormUpdate = ({ client, onClose }: { client?: Client; onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Client>({
    id: client?.id || "", 
    fullName: client?.fullName || "",
    email: client?.email || "",
    phone: client?.phone || "",
    birthDate: client?.birthDate || "",
    address: client?.address || "",
  });

 useEffect(() => {
  if (client && client.id !== formData.id) {
    setFormData(client);
  }
}, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({
      id: client?.id || "",
      fullName: "",
      email: "",
      phone: "",
      birthDate: "",
      address: "",
    });
    onClose(); 
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formData.id) {
    alert("Erro: ID do cliente não encontrado.");
    return;
  }

  try {
    console.log("🔄 Enviando atualização do cliente:", formData);

    const response = await dispatch(updateClient(formData));

    if (response.meta.requestStatus === "fulfilled") {
      alert("Usuário atualizado com sucesso!");
      navigate("/clients");
    } else {
      const errorMessage = response.payload || "Erro ao atualizar usuário!";
      alert(`Erro: ${errorMessage}`);
    }
  } catch (error: any) {
    console.error("Erro inesperado:", error);
    alert("Erro inesperado ao atualizar usuário. Tente novamente.");
  }
};


  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <InputContainer>
            <Input type="text" name="fullName" placeholder="Nome *" value={formData.fullName} onChange={handleChange} />
          </InputContainer>
          <InputContainer>
            <Input type="email" name="email" placeholder="E-mail *" value={formData.email} onChange={handleChange} />
          </InputContainer>
        </FormRow>

        <FormRow>
          <InputContainer>
            <Input type="tel" name="phone" placeholder="Telefone *" value={formData.phone} onChange={handleChange} />
          </InputContainer>
          <InputContainer>
            <Input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
          </InputContainer>
        </FormRow>

        <FormRow>
          <InputContainer>
            <Input type="text" name="address" placeholder="Endereço *" value={formData.address} onChange={handleChange} />
          </InputContainer>
        </FormRow>

        <ButtonContainer>
          <Button type="button" onClick={handleCancel}>Cancelar</Button>
          <Button type="submit" primary>
            Atualizar
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default ClientFormUpdate;



