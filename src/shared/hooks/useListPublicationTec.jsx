import { useState, useEffect, useCallback } from "react";
import { getPublicationsTecnologia } from "../../services/api";

export const useListPublicationTec = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPublications = useCallback(async () => {
        setLoading(true);
        setError(null);

        const response = await getPublicationsTecnologia();

        if (response.error) {
            setError("Error al obtener las publicaciones.");
            setPublications([]);
        } else {
            setPublications(response.data || []);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        fetchPublications();
    }, [fetchPublications]);

    return {
        publications,
        loading,
        error,
    };
};