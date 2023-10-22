import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

export const registerUser = async (userData: { username: string; email: string; password: string }) => {
    return axiosInstance.post('api/users/register/', userData);
};

export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await axiosInstance.post('users/login/', credentials);
  if (response.status === 200) {
      // Set the JWT in the cookies
      document.cookie = `jwt=${response.data.jwt}; path=/; HttpOnly`;
  }
  return response;
};

export const logoutAPI = async () => {
  try {
    const response = await axiosInstance.post('/users/logout/');
    return response.data;
  } catch (error) {
    if ((error as AxiosError).response) {
      throw (error as AxiosError).response?.data;
    } else {
      throw new Error("Server error");
    }
  }
}
