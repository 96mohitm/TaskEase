import axiosInstance from './axiosInstance';

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

export const logoutUser = () => {
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
