import styled from "styled-components";
import ClientForm from "../components/ClientForm";
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

const ClientsRegisterPage = () => {
  return (
    <PageContainer>
      {/* Sidebar Fixo */}
      <Sidebar />

      {/* Conteúdo da Página */}
      <Content>
        <Title>Cadastrar Cliente</Title>
        <ClientForm />
      </Content>
    </PageContainer>
  );
};

export default ClientsRegisterPage;
