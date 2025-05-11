import { useState, useCallback } from "react";
import { getPublicationById } from "../../services/api";

export const useFindByIdPublication = () => {
    const [publication, setPublication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPublicationById = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        const res = await getPublicationById(id);

        if (res.error) {
            setError(res.message || "Error al obtener la publicación.");
        } else {
            setPublication(res.data);
        }

        setLoading(false);
    }, []);

    return { 
        publication, 
        loading, 
        error, 
        fetchPublicationById 
    };
};
