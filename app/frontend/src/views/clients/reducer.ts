import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createClientRequest, fetchClientsRequest } from "./apit";

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
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

// Thunk para buscar clientes da API
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

// Thunk para cadastrar um novo cliente
export const createClient = createAsyncThunk<
  Client,
  Client,
  { rejectValue: string }
>("clients/createClient", async (clientData, { rejectWithValue }) => {
  try {
    // Converte a data para o formato correto
    const formattedData = {
      ...clientData,
      birthdate: new Date(clientData.birthDate).toISOString().split("T")[0], // Formato YYYY-MM-DD
    };

    console.log("Enviando cliente:", formattedData);

    const response = await createClientRequest(formattedData);
    return response;
  } catch (error: any) {
    console.error("Erro ao cadastrar cliente:", error.message);
    return rejectWithValue(error.message);
  }
});

// Criando o slice
const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {}, // Podemos adicionar reducers síncronos aqui depois
  extraReducers: (builder) => {
    builder
      // Buscando clientes
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

      // Criando cliente
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
      });
  },
});

export default clientSlice.reducer;
