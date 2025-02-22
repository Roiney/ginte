import axios from "axios";

import { getAuthToken } from "../../utils/getAuthToken";
import API_AUTH_URL from "./url";

export const doLoginRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `${API_AUTH_URL}/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const doValidateUserRequest = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${API_AUTH_URL}/validation`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
