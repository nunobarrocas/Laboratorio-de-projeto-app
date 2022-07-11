import axios from "axios";

export const loginUser = async (values) => {
    const url = 'api/users/login';

    const response = await axios.post(url, values);
    return response.data;
}

export const registerUser = async (values) => {
    const url = 'api/users/';

    const response = await axios.post(url, values);
    return response.data;
}

export const getUser = async (values) => {
    const url = 'api/users/profile';

    const response = await axios.get(url, values);
    return response.data;
}

export const updateUser = async (values) => {
    const url = 'api/users/profile';    

    const response = await axios.put(url, values);
    return response.data;
}

