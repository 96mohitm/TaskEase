import axiosInstance from './axiosInstance';

export const fetchTasks = async () => {
    try {
        const response = await axiosInstance.get('tasks/');
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
