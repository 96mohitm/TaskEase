import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';

export const registerUser = async (userData: { 
  username: string; 
  email: string; 
  password: string; 
  avatar?: File | null 
}) => {
  const formData = new FormData();
  formData.append('username', userData.username);
  formData.append('email', userData.email);
  formData.append('password', userData.password);
  
  if (userData.avatar) {
      formData.append('avatar', userData.avatar);
  }

  const config = {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  };

  return axiosInstance.post('users/register/', formData, config);
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

export const fetchUserProfile = async () => {
  const response = await axiosInstance.get('/users/profile/');
  return response.data;
};
