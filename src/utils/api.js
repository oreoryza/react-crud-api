import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;

export const post = async (data) => {
    const res = await axios.post(`${API_URL}/students`, data, {
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'RJS1-202414',
        },
    });
    return res.data;
}

export const get = async () => {
    const res = await axios.get(`${API_URL}/students`, {
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'RJS1-202414',
        },
    });
    return res.data;
}

export const remove = async (id) => {
    const res = await axios.delete(`${API_URL}/students/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'RJS1-202414',
        },
    });
    return res.data;
}
export const update = async (data, id) => {
    const res = await axios.put(`${API_URL}/students/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'RJS1-202414',
        },
    });
    return res.data;
}

export const detail = async (id) => {
    const res = await axios.get(`${API_URL}/students/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'api-key': 'RJS1-202414',
        },
    });
    return res.data;
}