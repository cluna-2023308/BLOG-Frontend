import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <main className='min-h-screen flex flex-col'>
        <Navbar />
        <div className='flex justify-center flex-1 flex-row'>
            <section className='flex-1 text-lg font-bold bg-gray-100 flex flex-col justify-center items-center'>
                <span>Tecnologia III</span>
                <button
                    onClick={() => navigate('/publicaciones/tecnologia')}
                    className='mt-4 bg-gray-100 hover:bg-neutral-200'
                >
                    Ver las publicaciones
                </button>
            </section>
            <section className='flex-1 text-lg font-bold bg-gray-200 flex flex-col justify-center items-center'>
                <span>Taller III</span>
                <button 
                    onClick={() => navigate('/publicaciones/taller')}
                    className='mt-4 bg-gray-200 hover:bg-neutral-300'
                >
                    Ver las publicaciones
                </button>
            </section>
            <section className='flex-1 text-lg font-bold bg-gray-300 flex flex-col justify-center items-center'>
                <span>Practica Supervisada</span>
                <button 
                    onClick={() => navigate('/publicaciones/practica')}
                    className='mt-4 bg-gray-300 hover:bg-neutral-400'
                >
                    Ver las publicaciones
                </button>
            </section>
        </div>
    </main>
  );
};