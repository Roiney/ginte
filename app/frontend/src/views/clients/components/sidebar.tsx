import { FaPlus, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 260px;
  height: 853px;
  background: #ffffff;
  border-right: 1px solid #d2d2d2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 16px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MenuItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  font-size: 16px;
  color: black;
  cursor: pointer;
  border-radius: 8px;
  background: ${({ active }) => (active ? "#E0ECD4" : "transparent")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};

  &:hover {
    background: #e0ecd4;
  }
`;

const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: red;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtém a rota atual

  return (
    <SidebarContainer>
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

      {/* Sair */}
      <LogoutButton>
        {FaSignOutAlt as unknown as JSX.Element} Sair
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;
