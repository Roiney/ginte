import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import ClientsTable from "../components/ClientsTable";
import Sidebar from "../components/sidebar";
import { ClientState, deleteClients, fetchClients } from "../reducer";

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

  // 🔥 Estados para os filtros
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Estado para debounce
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchClientsHandler = () => {
    dispatch(fetchClients({ search, page, limit }));
  };

  // 🚀 UseEffect para debounce da pesquisa
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // Aguarda 500ms antes de disparar a API

    return () => {
      clearTimeout(handler); // Se o usuário continuar digitando, reinicia o temporizador
    };
  }, [search]);

    const handleDeleteClients = async (ids: string[]) => {
    try {
      await dispatch(deleteClients(ids)); // Chama a API de exclusão
      fetchClientsHandler(); // Atualiza a lista após deletar
    } catch (error) {
      console.error("Erro ao excluir clientes:", error);
    }
  };

  // 🚀 Dispara a API somente quando `debouncedSearch` mudar
  useEffect(() => {
    dispatch(fetchClients({ search: debouncedSearch, page, limit }));
  }, [dispatch, debouncedSearch, page, limit]);

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
             onDelete={handleDeleteClients} 
          />
        )}
      </Content>
    </PageContainer>
  );
};

export default ClientsPage;