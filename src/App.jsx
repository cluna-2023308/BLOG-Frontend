import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import PublicationTecnologia from './components/publications/PublicationTecnologia';
import PublicationTaller from './components/publications/PublicationTaller';
import PublicationPractica from './components/publications/PublicationPractica';
import PublicationInformation from './components/publications/PublicationInformation';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publicaciones/tecnologia" element={<PublicationTecnologia />} />
      <Route path="/publicaciones/taller" element={<PublicationTaller />} />
      <Route path="/publicaciones/practica" element={<PublicationPractica />} />
      <Route path="/publication/:id" element={<PublicationInformation />} />
    </Routes>
  );
};

export default App;