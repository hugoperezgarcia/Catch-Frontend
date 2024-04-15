import React from 'react';
import { useId, useState } from 'react';
import { LogoHome, LogoAtras } from './Icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";
import Loader from './Loader';


export function CrearPartida() {
    const [loading, setLoading] = useState(false);
    const nivel = useId();
    const dificultad = useId();
    const asignatura = useId();
    const rondas = useId();
    const vidas = useId();
    const title = useId();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const userId = sessionStorage.getItem("userId");

    const goBack = () => {
        navigate(-1);
    }

    const onSubmit = async (info) => {
        let infoParams = {};
        for (var param in info) {
            if (info[param] !== "mezcla") {
                infoParams[param] = info[param];
            }
            infoParams["idAdmin"] = userId;
        }
        try {
            setLoading(true);
            const response = await axios.post("https://catchit-back-production.up.railway.app/api/create", null, {
                params: infoParams
            });
            console.log(response.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            {loading ? <Loader /> : (
                <section className="bg-gradient-to-br from-orange-300 to-rose-600 h-screen">
                    <header className="flex justify-between font-extrabold animate-flip-down animate-ease-in-out text-5xl text-center p-10">
                        <button className='w-10' onClick={goBack} >
                            <LogoAtras />
                        </button>
                        <div>
                            <h1>INTRODUCIR PREGUNTAS</h1>
                        </div>
                        <div className='w-10'>
                            <Link to="/"><LogoHome /></Link>
                        </div>
                    </header>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <main className='flex flex-col items-center gap-5'>
                            <div>
                                <label className='font-semibold' htmlFor={title}>Título: </label><br />
                                <input className='p-3 h-10 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300' type="text" {...register("titulo")} id={title} required />
                            </div>
                            <div>
                                <label className='font-semibold' htmlFor={nivel}>Nivel De Pregunta: </label><br />
                                <select
                                    className='h-10 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300'
                                    id={dificultad} {...register("nivel")}
                                    required
                                >
                                    <option value="mezcla">Mezcla</option>
                                    <option value="1ESO">1 ESO</option>
                                    <option value="2ESO">2 ESO</option>
                                    <option value="3ESO">3 ESO</option>
                                    <option value="4ESO">4 ESO</option>
                                    <option value="1BACH">1 BACH</option>
                                    <option value="2BACH">2 BACH</option>
                                </select>
                            </div>
                            <div>
                                <label className='font-semibold' htmlFor={dificultad}>Dificultad: </label><br />
                                <select
                                    className='h-10 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300'
                                    id={dificultad} {...register("dificultad")}
                                    required
                                >
                                    <option value="mezcla">Mezcla</option>
                                    <option value="facil">Fácil</option>
                                    <option value="intermedia">Intermedia</option>
                                    <option value="dificil">Difícil</option>
                                </select>
                            </div>

                            <div>
                                <label className='font-semibold' htmlFor={asignatura}>Asignatura: </label><br />
                                <select
                                    className='h-10 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300'
                                    id={dificultad} {...register("asignatura")}
                                    required
                                >
                                    <option value="mezcla">Todo</option>
                                    <option value="1ESO">Matematicas</option>
                                    <option value="2ESO">Lengua</option>
                                    <option value="3ESO">Física</option>
                                    <option value="4ESO">Quimica</option>
                                    <option value="1BACH">Biologia</option>
                                    <option value="1ESO">Geoolgía</option>
                                    <option value="2BACH">Inglés</option>
                                    <option value="1ESO">Historia</option>
                                    <option value="1ESO">Francés</option>
                                    <option value="1ESO">Música</option>
                                    <option value="1ESO">Informatica</option>
                                    <option value="1ESO">Plástica</option>
                                    <option value="1ESO">Filosofía</option>
                                    <option value="1ESO">Economía</option>
                                </select>
                            </div>
                            <div>
                                <label className='font-semibold' htmlFor={rondas}>Rondas: </label><br />
                                <input className='p-3 h-10 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300' {...register("numRondas")} type="number" id={rondas} required />
                            </div>
                            <div>
                                <label className='font-semibold' htmlFor={vidas}>Vidas: </label><br />
                                <input className='p-3 h-10 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300' type="number" {...register("numVidas")} id={vidas} required />
                            </div>
                            <div className='flex justify-center'>
                                <input type="submit" className="p-3 bg-red-200 rounded-lg hover:bg-red-300 font-semibold" value="CREAR PARTIDA" />
                            </div>
                        </main>
                    </form>

                </section>
            )}
        </>
    );
}