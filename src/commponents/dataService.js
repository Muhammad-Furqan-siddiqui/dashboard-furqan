// src/commponents/dataService.js
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchData = async (endpoint) => {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
};

export const addData = async (endpoint, data) => {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
    return response.data;
};

export const editData = async (endpoint, id, data) => {
    const response = await axios.put(`${BASE_URL}/${endpoint}/${id}`, data);
    return response.data;
};

export const deleteData = async (endpoint, id) => {
    await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
};
