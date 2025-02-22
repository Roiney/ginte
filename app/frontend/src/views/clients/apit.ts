import axios from "axios";
import { getAuthToken } from "../../utils/getAuthToken";
import API_CLIENT_URL from "./url";

export const createClientRequest = async ({
  name,
  email,
  phone,
  birthdate,
  address,
}: {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
}): Promise<any> => {
  const token = getAuthToken();
  const response = await axios.post(
    `${API_CLIENT_URL}`,
    {
      fullName: name,
      email,
      phone,
      birthDate: birthdate,
      address,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};
