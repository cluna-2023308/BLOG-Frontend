import React, { useState } from "react";
import { useListPublicationTec } from "../../shared/hooks/useListPublicationTec";
import { useListPublicationNewTec } from "../../shared/hooks/useListNewPubliTecno";
import { useNavigate } from "react-router-dom";

const PublicationTecnologia = () => {
    const { publications: defaultPublications, loading, error } = useListPublicationTec();
    const { publications: newPublications, loading: loadingNew, error: errorNew } = useListPublicationNewTec();
    const [isSorted, setIsSorted] = useState(false);
    const navigate = useNavigate();

    const publications = isSorted ? newPublications : defaultPublications;

    if (loading || loadingNew) {
        return <p className="text-center text-lg">Cargando publicaciones...</p>;
    }

    if (error || errorNew) {
        return <p className="text-center text-lg text-red-500">Error: {error || errorNew}</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Publicaciones de Tecnología III</h1>
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
                    onClick={() => setIsSorted(!isSorted)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-800 transition-colors"
                >
                    {isSorted ? "Orden original" : "Ordenar por publicación más reciente"}
                </button>
                <nav className="mb-10"></nav>
                <button
                    onClick={() => navigate("/")}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                    Regresar
                </button>
            </div>
        </div>
    );
};

export default PublicationTecnologia;