import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3003/blog/v1",
    timeout: 5000,
    httpAgent: false,
});

export const getPublicationsTecnologia = async () => {
    try {
        const res = await apiClient.get("/publication/Tecnologia III");
        return {data: res.data};
    } catch (error) {
        return {error: error.message};
    }
}

export const getPublicationsTaller = async () => {
    try {
        const res = await apiClient.get("/publication/Taller III");
        return {data: res.data};
    } catch (error) {
        return {error: error.message};
    }
}

export const getPublicationsPractica = async () => {
    try {
        const res = await apiClient.get("/publication/Practica Supervisada");
        return {data: res.data};
    } catch (error) {
        return {error: error.message};
    }
}