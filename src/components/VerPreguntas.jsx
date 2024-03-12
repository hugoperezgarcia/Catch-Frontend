import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { UseUser } from '../hooks/UseUser';
import Pregunta from './Pregunta';
import { Link } from 'react-router-dom';
import { LogoHome, LogoAtras } from './Icons';

function Preguntas() {
    const [preguntas, setPreguntas] = useState([]);
    const { user } = UseUser();
    const getPreguntas = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/preguntas");
            setPreguntas(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    const [filtro, setFiltro] = useState("")

    const filtrarPreguntas = (event) => {
        setFiltro(event.target.value)
    }
    const preguntasFiltradas = preguntas.filter(pregunta =>
        pregunta.pregunta.toLowerCase().includes(filtro.toLowerCase())
    )
    useEffect(() => {
        getPreguntas();
    }, [])
    return (
        <>
            <section className="bg-gradient-to-br from-orange-300 to-rose-600 min-h-screen">
                <header>
                    <div className="flex justify-between p-8 items-center">
                        <div className='w-10'>
                            <LogoAtras />
                        </div>
                        <div>
                            <h1 className="font-extrabold animate-flip-down animate-ease-in-out text-5xl">TODAS LAS PREGUNTAS</h1>
                        </div>
                        <div className='w-10'>
                            <Link to="/"><LogoHome /></Link>
                        </div>
                    </div>
                    <div className="flex justify-between mx-5">
                        <input className="ms-5 w-3/4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 p-3" type="search" placeholder="Buscar pregunta" onChange={filtrarPreguntas} />
                        <div className="flex gap-7 mx-5">
                            <Link to="/createpartida" className="p-2 bg-red-200 rounded-lg hover:bg-red-300 font-semibold">CREAR PARTIDA</Link>
                            <Link to="/createpregunta" className="p-2 bg-red-200 rounded-lg hover:bg-red-300 font-semibold">INTRODUCIR PREGUNTAS</Link>
                        </div>
                    </div>
                </header>
                <main className="p-10 flex flex-wrap gap-5">
                    {
                        preguntasFiltradas.map((pregunta) => {
                            const esMia = user.preguntas.some(p => p.id === pregunta.id)
                            if (esMia) {
                                return (<Pregunta owner={user} pregunta={pregunta} />)
                            } else {
                                return (<Pregunta pregunta={pregunta} />)
                            }
                        })
                    }
                </main>
            </section>
        </>
    )
}

export default Preguntas
