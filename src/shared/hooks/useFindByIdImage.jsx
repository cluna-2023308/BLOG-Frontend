import { useState, useCallback } from "react";
import { getImageById } from "../../services/api";

export const useFindByIdImage = () => {
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchImageById = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        const res = await getImageById(id);

        if (res.error) {
            setError(res.message || "Error al obtener la imagen.");
        } else {
            setImageData(res.data);
        }

        setLoading(false);
    }, []);

    return { 
        imageData, 
        loading, 
        error, 
        fetchImageById 
    };
}