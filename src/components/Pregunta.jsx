import React from 'react'
import { Link } from 'react-router-dom';
import { LogoEditar } from './Icons';

function Pregunta(props) {
    const {id, pregunta, respuestaCorrecta, respuesta1, respuesta2, respuesta3, nivel, dificultad, asignatura, tiempo, imagen} = props.pregunta;
    const src = "https://catchit-back-production.up.railway.app/api/pregunta/" + id + "/foto";
    return (
        <div key={id} className="flex justify-between rounded-lg p-3 bg-violet-200 w-full h-auto text-xl hover:bg-violet-300 shadow-md shadow-violet-900">
                            <div className='font-titulo2'>
                                <p className="font-titulo1 font-semibold">{pregunta}</p>
                                <p>Respuesta Correcta: {respuestaCorrecta}</p>
                                <p>Respuesta 1: {respuesta1}</p>
                                <p>Respuesta 2: {respuesta2}</p>
                                <p>Respuesta 3: {respuesta3}</p>
                                <p>Nivel: {nivel}</p>
                                <p>Dificultad: {dificultad}</p>
                                <p>Asignatura: {asignatura}</p>
                                <p>Tiempo: {tiempo}s</p>
                                {imagen && (<img src={src} alt="Imagen en Base64"></img>)}
                            </div>
                            {
                                props.owner &&(
                                    <Link to={"/editPregunta/"+ id}>
                                    <div className="w-5">
                                        <LogoEditar />
                                    </div>
                                    </Link>
                                )
                            }
                        </div>
    )
}

export default Pregunta
