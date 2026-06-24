import axios from 'axios';
import { 
    saveStudentsToIndexedDB, 
    getStudentsFromIndexedDB, 
    deleteStudentFromIndexedDB, 
    addPendingOperation, 
    updateStudentInIndexedDB 
} from '../utils/indexedDB';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Create an Axios instance to attach the token automatically
export const apiClient = axios.create({ baseURL: API_URL });
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export const loginAPI = async (credentials) => {
    return await axios.post(`${API_URL}/auth/login`, credentials);
};

export const signupAPI = async (data) => {
    return await axios.post(`${API_URL}/auth/signup`, data);
};

export const fetchUsers = async () => {
    try {
        const result = await apiClient.get('/');
        await saveStudentsToIndexedDB(result.data);
        return result.data;
    } catch (err) {
        console.log("Offline mode: Fetching from IndexedDB");
        return await getStudentsFromIndexedDB();
    }
};

export const fetchUserById = async (id) => {
    try {
        const result = await apiClient.get(`/getUser/${id}`);
        return result.data;
    } catch (err) {
        console.log("Offline mode: Fetching user from IndexedDB");
        const localUsers = await getStudentsFromIndexedDB();
        return localUsers.find(u => u._id === id) || null;
    }
};

export const createUser = async (formData) => {
    if (navigator.onLine) {
        try {
            return await apiClient.post(`/create`, formData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    } else {
        const file = formData.get("resume");
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            age: formData.get("age"),
            gender: formData.get("gender"),
            education: formData.get("education"),
            skills: JSON.parse(formData.get("skills") || "[]"),
            file: file
        };
        const tempId = 'temp_' + Date.now();
        await addPendingOperation({ type: 'CREATE', payload });
        await updateStudentInIndexedDB({ _id: tempId, ...payload, resume: file ? file.name : null });
        return { data: "Offline user created" };
    }
};

export const updateUser = async (id, formData) => {
    if (navigator.onLine) {
        try {
            return await apiClient.put(`/updateUser/${id}`, formData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    } else {
        const file = formData.get("resume");
        const payload = {
            id,
            name: formData.get("name"),
            email: formData.get("email"),
            age: formData.get("age"),
            gender: formData.get("gender"),
            education: formData.get("education"),
            skills: JSON.parse(formData.get("skills") || "[]"),
            file: file
        };
        await addPendingOperation({ type: 'UPDATE', payload });
        await updateStudentInIndexedDB({ _id: id, ...payload, resume: file ? file.name : null });
        return { data: "Offline user updated" };
    }
};

export const deleteUser = async (id) => {
    if (navigator.onLine) {
        try {
            await apiClient.delete(`/deleteUser/${id}`);
            await deleteStudentFromIndexedDB(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    } else {
        await addPendingOperation({ type: 'DELETE', payload: { id } });
        await deleteStudentFromIndexedDB(id);
    }
};

export const removeResume = async (id) => {
    if (navigator.onLine) {
        return await apiClient.put(`/removeResume/${id}`);
    } else {
        alert("Cannot remove resume while offline");
        throw new Error("Offline");
    }
};

export const updateRoleAPI = async (id, role) => {
    return await apiClient.put(`/updateRole/${id}`, { role });
};
