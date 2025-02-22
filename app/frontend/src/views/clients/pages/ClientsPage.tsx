import { useState } from "react";
import styled from "styled-components";
import ClientsTable from "../components/ClientsTable";
import Sidebar from "../components/sidebar";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

const ClientsPage = () => {

     const [clients] = useState([
    { id: 1, name: "Latoya Bartlett", email: "Alison48@hotmail.com", phone: "489-742-5107", birthdate: "20/06/2000", address: "Rua XYZ" },
    { id: 2, name: "Jack McClure", email: "Maddison28@gmail.com", phone: "204-209-6485", birthdate: "20/06/2000", address: "Rua XYZ" },
    { id: 3, name: "Ana Kreiger", email: "Pfeffer@hotmail.com", phone: "637-820-7704", birthdate: "20/06/2000", address: "Rua XYZ" },
    { id: 4, name: "Edith Feil", email: "Ethelyn60@hotmail.com", phone: "855-494-0199", birthdate: "20/06/2000", address: "Rua XYZ" },
    { id: 5, name: "Andy Shields", email: "schmitt@yahoo.com", phone: "802-453-2916", birthdate: "20/06/2000", address: "Rua XYZ" },
  ]);

  return (
    <PageContainer>
      {/* Sidebar Fixo */}
      <Sidebar />

      {/* Conteúdo da Página */}
      <Content>
        <Title>Clientes</Title>
        <ClientsTable clients={clients} />
      </Content>
    </PageContainer>
  );
};

export default ClientsPage;
