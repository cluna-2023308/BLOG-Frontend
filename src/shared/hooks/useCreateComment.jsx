import { useState } from "react";
import { createComment } from "../../services/api";

export const useCreateComment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleCreateComment = async (publicationId, text, user) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await createComment(publicationId, text, user);
            if (response.error) {
                setError(response.error);
            } else {
                setSuccess(true);
                return response.data; // Devuelve el comentario creado
            }
        } catch (err) {
            setError(err.message || "Error al crear el comentario.");
        } finally {
            setLoading(false);
        }
    };

    return { handleCreateComment, loading, error, success };
};