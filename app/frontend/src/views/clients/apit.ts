import axios from "axios";
import { getAuthToken } from "../../utils/getAuthToken";
import { Client } from "./reducer";
import API_CLIENT_URL from "./url";

export const createClientRequest = async ({
  fullName,
  email,
  phone,
  birthDate,
  address,
}: {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
}): Promise<any> => {
  const token = getAuthToken();
  const response = await axios.post(
    `${API_CLIENT_URL}`,
    {
      fullName,
      email,
      phone,
      birthDate,
      address,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const fetchClientsRequest = async ({
  page,
  limit,
  search,
  order = "asc",
}: {
  page?: number;
  limit?: number;
  search?: string;
  order?: "asc" | "desc";
}): Promise<{
  clients: Client[];
  total: number;
  limit: number;
  page: number;
}> => {
  try {
    const token = getAuthToken();

    // Construção dinâmica da URL com os filtros
    const params = new URLSearchParams();
    if (page) params.append("page", String(page));
    if (limit) params.append("limit", String(limit));
    if (search) params.append("search", search);
    params.append("order", order); // Padrão "asc"

    const url = `${API_CLIENT_URL}?${params.toString()}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar clientes");
  }
};

export const deleteClientRequest = async (id: string): Promise<void> => {
  const token = getAuthToken();
  await axios.delete(`${API_CLIENT_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchClientRequest = async (id: string): Promise<Client> => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_CLIENT_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro na requisição:", error);
    throw new Error(error.response?.data?.message || "Erro ao buscar cliente");
  }
};

export const updateClientRequest = async (
  clientId: string,
  clientData: Partial<Client> // Permite atualização parcial
): Promise<Client> => {
  try {
    const token = getAuthToken();
    const response = await axios.put(
      `${API_CLIENT_URL}/${clientId}`,
      clientData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Retorna o cliente atualizado
  } catch (error: any) {
    console.error(
      "Erro ao atualizar cliente:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar cliente"
    );
  }
};
