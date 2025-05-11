import { useState, useEffect, useCallback } from "react";
import { getPublicationsPracticaNew } from "../../services/api";

export const useListPublicationNewPrac = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPublications = useCallback(async () => {
        setLoading(true);
        setError(null);

        const response = await getPublicationsPracticaNew();

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