import React from "react";
import { useListPublicationTaller } from "../../shared/hooks/useListPublicationTaller";
import { useNavigate } from "react-router-dom";

const PublicationTaller = () => {
    const { publications, loading, error } = useListPublicationTaller();
    const navigate = useNavigate();

    if (loading) {
        return <p className="text-center text-lg">Cargando publicaciones...</p>;
    }

    if (error) {
        return <p className="text-center text-lg text-red-500">Error: {error}</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Publicaciones de Taller III</h1>
            <ul className="space-y-4">
                {publications.map((publication) => (
                    <li
                        key={publication._id}
                        className="p-4 border rounded-4xl shadow hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => navigate(`/publication/${publication._id}`)} // Navega al componente PublicationInformation
                    >
                        <h2 className="text-xl font-semibold">{publication.title}</h2>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center space-x-4 mt-6">
                <button
                    onClick={() => navigate("/")}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                    Regresar al Inicio
                </button>
            </div>
        </div>
    );
};

export default PublicationTaller;