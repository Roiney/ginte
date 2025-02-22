import { useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import styled from "styled-components";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
}

interface ClientsTableProps {
  clients: Client[];
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

const ClientsTable = ({ clients }: ClientsTableProps) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / rowsPerPage);
  const displayedClients = filteredClients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );


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

      {/* Botão de Excluir */}
      {selected.length > 0 && (
        <DeleteButton>
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
                checked={selected.length === clients.length}
                onChange={() =>
                  setSelected(selected.length === clients.length ? [] : clients.map((c) => c.id))
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
          {displayedClients.map((client) => (
            <TableRow key={client.id}>
              <TableData>
                <Checkbox
                  type="checkbox"
                  checked={selected.includes(client.id)}
                  onChange={() => handleSelect(client.id)}
                />
              </TableData>
              <TableData>{client.name}</TableData>
              <TableData>{client.email}</TableData>
              <TableData>{client.phone}</TableData>
              <TableData>{client.birthdate}</TableData>
              <TableData>{client.address}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Paginação */}
      <Pagination>
        <span>{selected.length} de {filteredClients.length} linhas selecionadas</span>
        <div>
          <PaginationButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Anterior
          </PaginationButton>
          <PaginationButton
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Próxima
          </PaginationButton>
        </div>
      </Pagination>
    </TableContainer>
);
};

export default ClientsTable;
