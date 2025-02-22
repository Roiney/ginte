import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import ClientsTable from "../components/ClientsTable";
import Sidebar from "../components/sidebar";
import { ClientState, fetchClients } from "../reducer";

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
  const dispatch = useAppDispatch();
  const { clients, loading, error }: ClientState = useAppSelector((state) => state.client);

  // 🔥 Estado para filtros
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Mantemos um valor fixo para `limit`

  // 🚀 Dispara a API sempre que `search` ou `page` mudarem
  useEffect(() => {
    dispatch(fetchClients({ search, page, limit }));
  }, [dispatch, search, page, limit]);

  return (
    <PageContainer>
      <Sidebar />
      <Content>
        <Title>Clientes</Title>

        {loading && <p>Carregando clientes...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Passamos os filtros para a tabela */}
        {!loading && !error && (
          <ClientsTable
            clients={clients}
            search={search}
            setSearch={setSearch}
            page={page}
            setPage={setPage}
          />
        )}
      </Content>
    </PageContainer>
  );
};

export default ClientsPage;