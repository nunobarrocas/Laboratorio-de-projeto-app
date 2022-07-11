import axios from "axios";

export const registerPatient = async (values) => {
    const url = 'api/users/registerPatient';

    const response = await axios.post(url, values);
    return response.data;
    
}

export const getPatients = async (values) => {
        const url = `api/users/getAllPatients/${values}`;

        const response = await axios.get(url, values);
        return response.data;
}

export const deletePatient = async (values) => {
    const url = `api/users/deletePatient/${values._id}`;

    const response = await axios.delete(url, values);
    return response.data;
}

