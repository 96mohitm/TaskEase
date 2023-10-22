import axiosInstance from './axiosInstance';

export const fetchTasks = async (query: string = '', status: string | null = null, sortOption: string = '-created_at') => {
  let endpoint = 'tasks/';
  const params: any = {};

  if (query) {
    params.search = query;
  }

  if (status) {
    params.status = status;
  }

  params.ordering = sortOption;

  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (data: any) => {
  try {
    const response = await axiosInstance.post('tasks/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (id: number, data: any) => {
  try {
    const response = await axiosInstance.put(`tasks/${id}/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`tasks/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
