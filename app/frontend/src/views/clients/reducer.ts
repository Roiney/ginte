import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createClientRequest } from "./apit";

// Interface do cliente
interface Client {
  id?: string;
  name: string;
  email: string;
  phone: string;
  birthdate: string;
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
      birthdate: new Date(clientData.birthdate).toISOString().split("T")[0], // Formato YYYY-MM-DD
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
