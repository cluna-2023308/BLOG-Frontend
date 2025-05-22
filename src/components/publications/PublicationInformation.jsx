import React, { useEffect, useState } from "react";
import { useFindByIdPublication } from "../../shared/hooks/useFindByIdPublication";
import { useCreateComment } from "../../shared/hooks/useCreateComment";
import { useParams, useNavigate } from "react-router-dom";

const PublicationInformation = () => {
    const { id } = useParams();
    const { publication, loading, error, fetchPublicationById } = useFindByIdPublication();
    const { handleCreateComment, loading: creatingComment, error: commentError, success } = useCreateComment();
    const navigate = useNavigate();

    const [newComment, setNewComment] = useState("");
    const [user, setUser] = useState("");
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        if (id) {
            fetchPublicationById(id).catch((err) => {
                console.error("Error al obtener la publicación:", err);
            });
        }
    }, [id, fetchPublicationById]);

    useEffect(() => {
        const fetchImage = async () => {
            if (publication?._id) {
                try {
                    const res = await fetch(`http://localhost:3003/blog/v1/publication/image/${publication._id}`);
                    const data = await res.json();
                    if (data.success && data.image) {
                        setImageData(data.image);
                    } else {
                        setImageData(null);
                    }
                } catch (err) {
                    setImageData(null);
                    console.error("Error al cargar la imagen:", err);
                }
            }
        };
        fetchImage();
    }, [publication]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !user.trim()) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        const comment = await handleCreateComment(id, newComment, user);
        if (comment) {
            setNewComment("");
            setUser("");
            fetchPublicationById(id);
        }
    };

    if (loading) {
        return <p className="text-center text-lg">Cargando publicación...</p>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-lg text-red-500">Error: {error}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors mt-4"
                >
                    Regresar
                </button>
            </div>
        );
    }

    if (!publication) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-center text-lg text-gray-500">No se encontró la publicación.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold text-center mb-4">{publication.title}</h1>
            <p className="text-gray-700 mb-4 text-center">{publication.text}</p>
            <p className="text-gray-500 mb-4 text-center">
                <strong>Categoría:</strong> {publication.category?.name || "Sin categoría"}
            </p>
            <p className="text-gray-500 mb-4 text-center">
                <strong>Fecha:</strong>{" "}
                {publication.date ? new Date(publication.date).toLocaleDateString() : "Fecha no disponible"}
            </p>

            <div className="mb-4">
                {imageData ? (
                    <img
                        src={imageData}
                        alt={publication.title}
                        className="w-full max-w-md rounded-2xl shadow-lg"
                    />
                ) : (
                    <span className="text-red-500 text-center block">No hay imagen disponible para esta publicación.</span>
                )}
            </div>

            {publication.doc ? (
                <a
                    href={`data:application/pdf;base64,${publication.doc}`}
                    download={`${publication.title}.pdf`}
                    className="text-blue-500 hover:underline"
                >
                    Descargar Documento
                </a>
            ) : (
                <p className="text-red-500 text-center">No hay documento disponible para esta publicación.</p>
            )}

            <div className="mt-6 w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4 text-center">Comentarios</h2>
                {publication.comments && publication.comments.length > 0 ? (
                    <ul className="space-y-4">
                        {publication.comments.map((comment) => (
                            <li key={comment._id} className="p-4 border rounded-2xl shadow">
                                <p className="text-emer-700">
                                    <strong>Usuario:</strong> {comment.user || "Anónimo"}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Comentario:</strong> {comment.text}
                                </p>
                                <p className="text-gray-500">
                                    <strong>Fecha:</strong>{" "}
                                    {comment.date ? new Date(comment.date).toLocaleDateString() : "Fecha no disponible"}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">No hay comentarios para esta publicación.</p>
                )}
            </div>

            <div className="mt-6 w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4 text-center">¿Deseas agregar un comentario?</h2>
                <form onSubmit={handleSubmitComment} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className="border p-2 w-full rounded-2xl"
                        required
                    />
                    <textarea
                        placeholder="Aquí tu comentario..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="border p-2 w-full rounded-2xl"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-800 transition-colors"
                        disabled={creatingComment}
                    >
                        {creatingComment ? "Enviando..." : "Agregar Comentario"}
                    </button>
                    {commentError && <p className="text-red-500">{commentError}</p>}
                    {success && <p className="text-emerald-600">Comentario agregado exitosamente.</p>}
                </form>
            </div>

            <div className="flex justify-center space-x-4 mt-6">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                    Regresar
                </button>
            </div>
        </div>
    );
};

export default PublicationInformation;
