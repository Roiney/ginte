import { FaPlus, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../../assets/genti.png"; // Substitua pelo caminho correto da logo

const SidebarContainer = styled.div`
  width: 260px;
  height: 100vh; /* Garante que ocupe a altura total da tela */
  background: #ffffff;
  border-right: 1px solid #d2d2d2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  justify-content: space-between; /* Garante que o botão de logout fique sempre no final */
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px; /* Aumentei o espaçamento entre o logo e os botões */
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%; /* Deixa o logo redondo */
  object-fit: cover; /* Garante que a imagem não fique distorcida */
  border: 3px solid #d2d2d2; /* Adiciona uma borda ao redor do logo */
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px; /* Aumentei um pouco o espaço entre os botões */
`;

const MenuItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  font-size: 16px;
  color: black;
  cursor: pointer;
  border-radius: 8px;
  background: ${({ active }) => (active ? "#E0ECD4" : "transparent")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #e0ecd4;
  }
`;

const LogoutContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto; /* 🔥 Isso faz com que o botão de sair fique SEMPRE na parte inferior */
`;

const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: red;
  cursor: pointer;
  font-size: 16px;
  padding: 12px;
  transition: color 0.2s ease-in-out;

  &:hover {
    text-decoration: underline;
    color: darkred;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SidebarContainer>
      {/* Logo da Empresa */}
      <LogoContainer>
        <Logo src={logo} alt="Logo da Empresa" />
      </LogoContainer>

      {/* Menu */}
      <Menu>
        <MenuItem
          active={location.pathname === "/clients"}
          onClick={() => navigate("/clients")}
        >
          {FaUsers as unknown as JSX.Element} Clientes
        </MenuItem>
        <MenuItem
          active={location.pathname === "/new-client"}
          onClick={() => navigate("/new-client")}
        >
          {FaPlus as unknown as JSX.Element} Cadastrar Cliente
        </MenuItem>
      </Menu>

      {/* 🔥 Botão de Logout agora está fixo no final da Sidebar */}
      <LogoutContainer>
        <LogoutButton>
          {FaSignOutAlt as unknown as JSX.Element} Sair
        </LogoutButton>
      </LogoutContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
