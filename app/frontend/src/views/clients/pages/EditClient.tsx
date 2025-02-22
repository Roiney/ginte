import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import ClientForm from "../components/ClientForm";
import Sidebar from "../components/sidebar";
import { fetchClient } from "../reducer";

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

const ClientsEditionPage = () => {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedClient, loading, error } = useAppSelector((state) => state.client);

  useEffect(() => {
    if (id) {
      dispatch(fetchClient(id)); // 🔥 Busca o cliente específico no backend
    }
  }, [dispatch, id]);

  return (
    <PageContainer>
      <Sidebar />
      <Content>
        <Title>Editar Cliente</Title>

        {loading && <p>Carregando cliente...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {selectedClient && <ClientForm client={selectedClient} onClose={() => navigate("/clients")} />}
      </Content>
    </PageContainer>
  );
};

export default ClientsEditionPage;
