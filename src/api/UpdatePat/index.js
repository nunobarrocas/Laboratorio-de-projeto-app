import axios from "axios";

export const updateTemperature = async (values) => {
    const url = `api/users/temperature/${values._id}`;

    const response = await axios.put(url, values);
    return response.data;
}

export const updateOxygen = async (values) => {
    const url = `api/users/oxygen/${values._id}`;

    const response = await axios.put(url, values);
    return response.data;

}

export const updateBloodPressure = async (values) => {
    const url = `api/users/bloodpressure/${values._id}`;

    const response = await axios.put(url, values);
    return response.data;

}

export const updateMedicines = async (values) => {
    const url = `api/users/medicines/${values._id}`;

    const response = await axios.put(url, values);
    return response.data;
}

export const registerInjury = async (values) => {
    const url = 'api/users/registerInjury';

    const response = await axios.post(url, values);
    return response.data;
    
}

export const getInjuries = async (values) => {
    const url = `api/users/getAllInjuries/${values}`;

    const response = await axios.get(url, values);
    return response.data;
}

export const updateFavoriteCategories = async (values) => {
    const url = `api/users/updateFavCategories/${values._id}`;

    const response = await axios.put(url, values);
    return response.data;
}

export const updateFavoriteTemperature = async (values) => {
    const url = `api/users/updateFavTemperature/${values._id}`;

    const response = await axios.put(url, values);
    return response.data;
}

export const updateFavoriteMeds = async (values) => {
    const url = `api/users/updateFavMedicine/${values._id}`;

    const response = await axios.put(url, values);
    return response.data;
}

export const updateFavoriteBp = async (values) => {
    const url = `api/users/updateFavBloodPressure/${values._id}`;

    const response = await axios.put(url, values);
    return response.data;
}

export const updateFavoriteOxyg = async (values) => {
    const url = `api/users/updateFavOxygen/${values._id}`;

    const response = await axios.put(url, values);
    return response.data;
}

export const updateFavoriteInj = async (values) => {
    const url = `api/users/updateFavInjuries/${values._id}`;

    const response = await axios.put(url, values);
    return response.data;
}