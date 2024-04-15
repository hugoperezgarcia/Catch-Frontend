import {Link, useNavigate} from "react-router-dom";
import {React, useState, useEffect} from 'react'
import { LogoHome } from "./Icons";
import { UseUser } from "../hooks/UseUser";
import usePartidas from "../hooks/usePartidas";

function RepositorioAdmin() {
    const navigate = useNavigate();
    const{user, resetUser} = UseUser();
    const{filtrarPartidas, partidasFiltradas} = usePartidas();


    return (
        <>
            <section className="bg-gradient-to-br from-orange-300 to-rose-600 h-fit">
                <header className="pt-16">
                    <div className="text-center p-8">
                        <h1 className="font-extrabold animate-flip-down animate-ease-in-out text-5xl">HOLA {user.username.toUpperCase()}, ESTAS SON TUS PARTIDAS</h1>
                    </div>
                    <div className="flex justify-between mx-5">
                        <input className="ms-5 w-3/4 rounded-lg focus:outline-none focus:ring-2 p-4 focus:ring-red-300" type="search" placeholder=" Buscar partida" onChange={filtrarPartidas}/>
                        <div className="flex gap-7 mx-5">
                            <Link to="/createPartida" className="p-3 bg-red-200 rounded-lg hover:bg-red-300 font-semibold">CREAR PARTIDA</Link>
                            <Link to="/createPregunta" className="p-3 bg-red-200 rounded-lg hover:bg-red-300 font-semibold">INTRODUCIR PREGUNTAS</Link>
                            {
                                user ?  (<Link to="/" className="p-3 bg-red-200 rounded-lg hover:bg-red-300 font-semibold"><LogoHome/>Inicio</Link>) : (<Link to="/" className="p-3 bg-red-200 rounded-lg hover:bg-red-300 font-semibold"><LogoHome/>Inicio</Link>)
                            }
                        </div>
                </div>
                </header>
                <main className="flex flex-wrap gap-5 mt-10 ms-10">
                    <Link to="/preguntas">
                        <div className="rounded-lg p-10 bg-red-200 w-80 h-52 text-xl hover:bg-red-300 hover:cursor-pointer font-semibold">
                        <h1>VER TODAS LAS PREGUNTAS</h1>
                        </div>
                    </Link>
                    {partidasFiltradas.map(partida => (
                            <div key={partida.id} className="rounded-lg p-10 bg-red-200 w-80 h-52 text-xl hover:bg-red-300 hover:cursor-pointer font-semibold">
                                <h1>{partida.titulo}</h1>
                                <p>{partida.id}</p>
                            </div>
                        ))}
                </main>
            </section>
        </>
    )
}

export default RepositorioAdmin
