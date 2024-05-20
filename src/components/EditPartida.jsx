import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { useNavigate, Link } from "react-router-dom";
import { LogoAtras, LogoHome, LogoEditar } from "./Icons";

function EditPartida() {
  const { idPartida } = useParams();
  const [loader, setLoader] = useState(true);
  const [partida, setPartida] = useState();
  const [preguntas, setPreguntas] = useState();
  const[detallePregunta, setDetallePregunta] = useState(); 
  const navigate = useNavigate();

  useEffect(() => {
    getPartida();
  }, []);

  const getPartida = async () => {
    try {
      const response = await axios.get(
        "https://catchit-back-production.up.railway.app/api/partida/" +
        idPartida
      );
      setPartida(response.data);
      setPreguntas(response.data.preguntas);
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  const volver = () => {
    Object.keys(sessionStorage).forEach((key) => {
      if (key != "userId") {
        sessionStorage.removeItem(key);
      }
    });
    navigate("/");
  };

  const mostrarDetalle = (pregunta) =>{
    setDetallePregunta(pregunta);
    console.log(pregunta);
  }

  const navigateRanking = () =>{
    navigate("/ranking", {state: { codigoSala: idPartida}})
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <section className="bg-gradient-to-br from-orange-300 to-rose-600 h-fit min-h-screen">
          <header className="flex justify-between p-5">
            <div>
              <button className="w-8"><LogoAtras /></button>
            </div>
            <h1 className="font-semibold text-4xl">
              Editar Partida
            </h1>
            <div>
              <button className="w-8" onClick={volver}><LogoHome /></button>
            </div>
          </header>
          <main className="flex justify-around h-full w-full">
            <aside className="w-1/2 h-full">
              <div className="my-3 mx-7 flex flex-col justify-center items-center border-2 rounded-lg bg-red-200">
                <h1 className="text-3xl m-3 uppercase font-semibold">{partida.titulo}</h1>
                <p className="text-xl font-semibold mt-10">Vidas: {partida.numVidas}</p>
                <p className="text-lg border-t border-black font-semibold">Rondas: {partida.numRondas}</p>
                <div className="my-10 flex flex-col gap-2">
                  <button className="rounded-lg p-1 font-semibold border-2 border-red-400 bg-red-300 text-white hover:bg-red-400 hover:text-white hover:border-2 hover:cursor-progress" onClick={() => navigateRanking()}>Ranking</button>
                  <button className="rounded-lg p-1 font-semibold border-2 border-red-400 bg-red-300 text-white hover:bg-red-400 hover:text-white hover:border-2 hover:cursor-progress">Guardar Cambios</button>
                </div>
              </div>
              {detallePregunta && (
                <div className="my-3 mx-7 flex flex-col border-2 rounded-lg bg-red-200">
                  <div className="w-5 m-3 self-end"><Link to={"/editPregunta/"+ detallePregunta.id}><LogoEditar /></Link></div>
                  <p className="p-2 m-3 self-center">{detallePregunta.pregunta}</p>
                  <div>
                    <p className="p-2 m-3 bg-lime-300 rounded-lg">{detallePregunta.respuestaCorrecta}</p>
                    <p className="p-2 m-3 bg-red-400 rounded-lg">{detallePregunta.respuesta1}</p>
                    <p className="p-2 m-3 bg-red-400 rounded-lg">{detallePregunta.respuesta2}</p>
                    <p className="p-2 m-3 bg-red-400 rounded-lg">{detallePregunta.respuesta3}</p>
                  </div>
                </div>
              )}
              {/* <div className="m-3 flex flex-col justify-center items-center border-2 rounded bg-red-200"></div> */}
            </aside>
            <div className="w-1/2 h-full flex items-center flex-col m-3">
              <h1 className="text-3xl m-5">Preguntas</h1>
              <div className="flex flex-col gap-3">
                {preguntas.map((pregunta, index) => (
                  <p key={index} className="p-3 bg-red-200 rounded-lg hover:bg-red-400 hover:text-white hover:border-2 hover:cursor-pointer" onClick={() => mostrarDetalle(pregunta)}>{pregunta.pregunta}</p>
                ))}
              </div>
            </div>
          </main>
        </section>
      )}
    </>
  );
}

export default EditPartida;
