import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  clearAuthToken,
  getAuthToken,
  setAuthToken,
} from "../../utils/getAuthToken";
import { AuthDrawerMode, AuthState, UserData } from "./types";
import { doLoginRequest, doValidateUserRequest } from "./userAPI";

// 🔹 Criando as ações assíncronas com createAsyncThunk
export const doLogin = createAsyncThunk(
  "auth/login",
  async (args: { email: string; password: string }) => {
    return await doLoginRequest(args);
  }
);

export const doValidateUser = createAsyncThunk(
  "auth/validateUser",
  async () => {
    return await doValidateUserRequest();
  }
);

// 🔹 Estado inicial
export const initialState: AuthState = {
  isLoading: false,
  data: {
    email: "",
    password: "",
  },
  session: {
    recoveringSession: true,
    logged: false,
    access_token: "",
  },
  user: null,
  drawerMode: AuthDrawerMode.LOGIN,
  drawerOpen: false,
};

// 🔹 Criando o Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 🔹 Recarregar login do LocalStorage
    initializeLogin: (state) => {
      const token = getAuthToken();
      if (token) {
        state.session.access_token = token;
        state.session.logged = true;
      }
      state.session.recoveringSession = false;
    },
    // 🔹 Logout
    doLogout: (state) => {
      state.session = initialState.session;
      state.user = null;
      clearAuthToken();
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.data.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.data.password = action.payload;
    },
    setDrawerMode: (state, action: PayloadAction<AuthDrawerMode>) => {
      state.drawerMode = action.payload;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 🔹 Login pendente
    builder.addCase(doLogin.pending, (state) => {
      state.isLoading = true;
    });

    // 🔹 Login falhou
    builder.addCase(doLogin.rejected, (state) => {
      state.isLoading = false;
    });

    // 🔹 Login bem-sucedido
    builder.addCase(doLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.session.access_token = payload.access_token;
      state.session.logged = true;
      setAuthToken(payload.access_token);
      state.drawerOpen = false;
    });

    // 🔹 Validação do usuário bem-sucedida
    builder.addCase(doValidateUser.fulfilled, (state, { payload }) => {
      state.user = payload as UserData | null;
    });
  },
});

// 🔹 Exportando as actions e reducer
export const {
  initializeLogin,
  doLogout,
  setDrawerMode,
  setDrawerOpen,
  setEmail,
  setPassword,
} = authSlice.actions;

export default authSlice.reducer;
