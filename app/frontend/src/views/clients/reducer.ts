import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createClientRequest,
  deleteClientRequest,
  fetchClientRequest,
  fetchClientsRequest,
} from "./apit";

// Interface do cliente
export interface Client {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
}

// Estado inicial do slice
export interface ClientState {
  clients: Client[];
  selectedClient: Client | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  selectedClient: null,
  loading: false,
  error: null,
};

// 🔥 Thunk para buscar clientes da API
export const fetchClients = createAsyncThunk<
  Client[],
  { search?: string; page?: number; limit?: number },
  { rejectValue: string }
>(
  "clients/fetchClients",
  async ({ search = "", page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      console.log(
        `🔎 Buscando clientes: search="${search}", page=${page}, limit=${limit}`
      );

      const response = await fetchClientsRequest({ search, page, limit });

      if (!Array.isArray(response.clients)) {
        console.error("Erro: A API não retornou um array válido:", response);
        return rejectWithValue("A API retornou um formato inválido.");
      }

      return response.clients;
    } catch (error: any) {
      console.error("Erro ao buscar clientes:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// 🔥 Thunk para excluir múltiplos clientes (um por um)
export const deleteClients = createAsyncThunk<
  string[], // Retorna um array com os IDs deletados
  string[], // Recebe um array de IDs
  { rejectValue: string }
>("clients/deleteClients", async (ids, { rejectWithValue }) => {
  const deletedIds: string[] = [];

  for (const id of ids) {
    try {
      await deleteClientRequest(id); // 🔥 Envia DELETE para cada ID separadamente
      deletedIds.push(id); // Adiciona ID à lista de deletados
    } catch (error) {
      console.error(`Erro ao excluir cliente ${id}:`, error);
    }
  }

  return deletedIds; // Retorna apenas os IDs que foram deletados com sucesso
});

export const fetchClient = createAsyncThunk<
  Client,
  string,
  { rejectValue: string }
>("clients/fetchClient", async (id, { rejectWithValue }) => {
  try {
    console.log(`🔍 Buscando cliente ID=${id}...`);
    const response = await fetchClientRequest(id);
    return response;
  } catch (error: any) {
    console.error("Erro ao buscar cliente:", error.message);
    return rejectWithValue(error.message);
  }
});
// 🔥 Thunk para cadastrar um novo cliente
export const createClient = createAsyncThunk<
  Client,
  Client,
  { rejectValue: string }
>("clients/createClient", async (clientData, { rejectWithValue }) => {
  try {
    // 🔥 Converte a data para o formato correto (YYYY-MM-DD)
    const formattedData = {
      ...clientData,
      birthDate: new Date(clientData.birthDate).toISOString().split("T")[0],
    };

    console.log("Enviando cliente:", formattedData);

    const response = await createClientRequest(formattedData);
    return response;
  } catch (error: any) {
    console.error("Erro ao cadastrar cliente:", error.message);
    return rejectWithValue(error.message);
  }
});

// 🔥 Criando o slice do Redux
const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔵 Buscando clientes
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchClients.fulfilled,
        (state, action: PayloadAction<Client[]>) => {
          state.loading = false;
          state.clients = action.payload; // Atualiza a lista de clientes
        }
      )
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🟢 Criando cliente
      .addCase(createClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createClient.fulfilled,
        (state, action: PayloadAction<Client>) => {
          state.loading = false;
          state.clients.push(action.payload);
        }
      )
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(
        deleteClients.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.loading = false;
          state.clients = state.clients.filter(
            (client) =>
              typeof client.id === "string" &&
              !action.payload.includes(client.id!)
          );
        }
      )
      .addCase(deleteClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchClient.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedClient = null;
      })
      .addCase(
        fetchClient.fulfilled,
        (state, action: PayloadAction<Client>) => {
          state.loading = false;
          state.selectedClient = action.payload; // 🔥 Armazena o cliente individual
        }
      )
      .addCase(fetchClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.selectedClient = null;
      });
  },
});

export default clientSlice.reducer;
