import { useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Client } from "../reducer";

interface ClientsTableProps {
  clients: Client[];
  search: string;
  setSearch: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
  onDelete: (ids: string[]) => void; // 🔥 Função de exclusão
}

const TableContainer = styled.div`
  background: #181818;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
  color: white;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #222;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  outline: none;
  padding-left: 10px;

  &::placeholder {
    color: #aaa;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  background: #333;
  color: white;
  padding: 12px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #222;
  }
`;

const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #333;
`;

const Checkbox = styled.input`
  accent-color: white;
`;

const DeleteButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;

  &:hover {
    background: #b30000;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const PaginationButton = styled.button`
  background: #333;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;

const ClientsTable = ({ clients, search, setSearch, page, setPage, onDelete }: ClientsTableProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const safeClients = Array.isArray(clients) ? clients : [];
 const navigate = useNavigate();
  // 🔥 Função para excluir clientes selecionados
  const handleDeleteSelected = () => {
    if (selected.length === 0) return;
    onDelete(selected);
    setSelected([]); // Limpa a seleção após excluir
  };

  return (
    <TableContainer>
      {/* Barra de Pesquisa */}
      <SearchBar>
        {FaSearch as unknown as JSX.Element}
        <SearchInput
          type="text"
          placeholder="Pesquise por nome ou email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchBar>

      {/* 🔥 Botão de Excluir */}
      {selected.length > 0 && (
        <DeleteButton onClick={handleDeleteSelected}>
          {FaTrash as unknown as JSX.Element}
          Excluir Selecionados
        </DeleteButton>
      )}

      {/* Tabela */}
      <Table>
        <thead>
          <tr>
            <TableHeader>
              <Checkbox
                type="checkbox"
                checked={selected.length === safeClients.length}
                onChange={() =>
                  setSelected(
                    selected.length === safeClients.length
                      ? []
                      : safeClients.map((c) => String(c.id))
                  )
                }
              />
            </TableHeader>
            <TableHeader>Nome</TableHeader>
            <TableHeader>E-mail</TableHeader>
            <TableHeader>Telefone</TableHeader>
            <TableHeader>Nascimento</TableHeader>
            <TableHeader>Endereço</TableHeader>
          </tr>
        </thead>
        <tbody>
          {safeClients.map((client) => {
            const clientId = String(client.id);

            return (
              <TableRow key={clientId} onClick={() => navigate(`/edit-client/${clientId}`)}>
                <TableData>
                  <Checkbox
                    type="checkbox"
                    checked={selected.includes(clientId)}
                    onChange={() =>
                      setSelected((prev) =>
                        prev.includes(clientId)
                          ? prev.filter((i) => i !== clientId)
                          : [...prev, clientId]
                      )
                    }
                  />
                </TableData>
                <TableData>{client.fullName}</TableData>
                <TableData>{client.email}</TableData>
                <TableData>{client.phone}</TableData>
                <TableData>{client.birthDate}</TableData>
                <TableData>{client.address}</TableData>
              </TableRow>
            );
          })}
        </tbody>
      </Table>

      {/* Paginação baseada na API */}
      <Pagination>
        <span>Página {page}</span>
        <div>
          <PaginationButton disabled={page === 1} onClick={() => setPage(page - 1)}>
            Anterior
          </PaginationButton>
          <PaginationButton onClick={() => setPage(page + 1)}>
            Próxima
          </PaginationButton>
        </div>
      </Pagination>
    </TableContainer>
  );
};

export default ClientsTable;
