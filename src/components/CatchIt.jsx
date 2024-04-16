import { useAsyncError, useLocation, useNavigate } from "react-router-dom";
import { LogoPuntos, LogoSkip, LogoSiVida, LogoNoVida } from "./Icons";
import { useState, useEffect } from "react";
import Loader from './Loader';
import axios from "axios";

export function CatchIt() {
  //Variables iniciales
  const navigate = useNavigate();
  const location = useLocation();
  const codigoSala = location.state?.codigoSala;
  const [loading, setLoading] = useState(false);
  
  //Variables a pintar
  const [marcadorPuntos, setMarcadorPuntos] = useState(1000);
  const [rondas, setRondas] = useState();
  const [rondaActual, setRondaActual] = useState(1);
  const [vidas, setVidas] = useState();
  const [puntosApostados, setPuntosApostados] = useState([0,0,0,0]);
  const [numPreguntaActual, setNumPreguntaActual] = useState(0);
  const [preguntas, setPreguntas] = useState([]);
 
  //Manejo del back

  //Redirigir si no existe codigo de sala
  
  useEffect(() => {
    if (!codigoSala) {
      navigate("/");
    }
  }, []);
  

  useEffect(() => {
    peticionBD();
  },[]);

  //Coger info de la base de datos
  async function peticionBD() {
    try {
      setLoading(true);
      const respuesta = await axios.get("https://catchit-back-production.up.railway.app/api/partida/" + codigoSala);
      setRondas(respuesta.data.numRondas);
      setVidas(respuesta.data.numVidas);
      setPreguntas(respuesta.data.preguntas);
  } catch (e) {
      console.log("Error" + e);
    }finally{
      setLoading(false);
    }
  }

  //declaracion de variables fijas una vez hecha la peticion en la bd
  function declararVariablesFijas(respuesta){
    
  }

  //Funcion que se llama cada vez que se cambia de pregunta para resetear todo y cambiar a nuevos valores
 

  //Manejo de puntos
  function handleIncrement(index) {
    if (marcadorPuntos >= 100) {
      const newPuntosApostados = [...puntosApostados];
      newPuntosApostados[index] = Math.min(newPuntosApostados[index] + 100, 1000);
      setPuntosApostados(newPuntosApostados);
      actualizarMarcador(newPuntosApostados);
    }
  }

  function handleDecrement(index) {
    const newPuntosApostados = [...puntosApostados];
    const restarPuntos = Math.min(newPuntosApostados[index], 100);
    newPuntosApostados[index] -= restarPuntos;
    setPuntosApostados(newPuntosApostados);
    actualizarMarcador(newPuntosApostados);
  }

  function actualizarMarcador(newPuntosApostados) {
    const totalPuntosApostados = newPuntosApostados.reduce((total, puntos) => total + puntos, 0);
    setMarcadorPuntos(1000 - totalPuntosApostados);
  }

  //Manejo del front
  //Manejo de colores de las preguntas
  function cambiarColorPregunta(i) {
    console.log(i);
    document.getElementById(`numPreg${i}`).classList.replace("border-red-500", "border-green-300");
    document.getElementById(`numPreg${i}`).classList.replace("bg-red-200", "bg-green-600");
    document.getElementById(`numPreg${i}`).classList.add("text-white");
  }

  function resetearColorPreguntas() {
    for (let i = 1; i < 9; i++) {
      document.getElementById(`numPreg${i}`).classList.replace("border-green-300", "border-red-500");
      document.getElementById(`numPreg${i}`).classList.replace("bg-green-600", "bg-red-200");
      document.getElementById(`numPreg${i}`).classList.remove("text-white");
    }
  }

  return (
   <>
    {loading ? <Loader /> : (
      <section className="bg-gradient-to-b from-blue-300 to-zinc-300 max-h-screen h-screen">
      <header className="flex justify-between h-3/5">
        <div className="mx-5">
          <div className="flex items-center">
            <div className="ring-white ring-2 shadow-md shadow-azul-oscuro rounded-full m-5 flex flex-col justify-center items-center min-w-24 h-24 font-medium text-white bg-azul-oscuro text-5xl animate-pulse animate-infinite animate-ease-in">
              {console.log(preguntas[numPreguntaActual])}
            </div>
            <button className="w-14 ring-white ring-2 shadow-md shadow-azul-oscuro bg-azul-oscuro flex justify-center rounded-lg font-thin text-white h-9 items-center">
              <LogoSkip />
            </button>
          </div>
          <div className="flex gap-1 justify-between m-2">
             {/*hay q cambiarlo por un bucle*/}
             {
              vidas >= 1 ? <LogoSiVida /> : <LogoNoVida />
            }
           {
              vidas >= 2 ? <LogoSiVida /> : <LogoNoVida />
            }
            {
              vidas >= 3 ? <LogoSiVida /> : <LogoNoVida />
            }
          </div>
          <div className="flex gap-3 justify-start m-3 text-5xl">
            <LogoPuntos />
            {marcadorPuntos}
          </div>
          <div className="flex gap-3 justify-start ms-4 m-3 text-4xl font-medium">
            Ronda: {rondaActual}/{rondas}
          </div>
        </div>
        <div className="h-full border-black border-2 rounded-lg mt-3 me-5 flex-grow flex flex-col items-center justify-around bg-gradient-to-b from-blue-600 to-blue-300">
          <div className="flex mt-3 w-full justify-around">
            <div id="numPreg1" className="rounded-full border-2 border-red-500 w-10 h-10 flex justify-center items-center font-medium bg-red-200">1</div>
            <div id="numPreg2" className="rounded-full border-2 border-red-500 w-10 h-10 flex justify-center items-center font-medium bg-red-200">2</div>
            <div id="numPreg3" className="rounded-full border-2 border-red-500 w-10 h-10 flex justify-center items-center font-medium bg-red-200">3</div>
            <div id="numPreg4" className="rounded-full border-2 border-red-500 w-10 h-10 flex justify-center items-center font-medium bg-red-200">4</div>
            <div id="numPreg5" className="rounded-full border-2 border-red-500 w-10 h-10 flex justify-center items-center font-medium bg-red-200">5</div>
            <div id="numPreg6" className="rounded-full border-2 border-red-500 w-10 h-10 flex justify-center items-center font-medium bg-red-200">6</div>
            <div id="numPreg7" className="rounded-full border-2 border-red-500 w-10 h-10 flex justify-center items-center font-medium bg-red-200">7</div>
            <div id="numPreg8" className="rounded-full border-2 border-red-500 w-10 h-10 flex justify-center items-center font-medium bg-red-200">8</div>
          </div>
          <div id="enunciadoPregunta" className="p-8 font-medium text-4xl w-full text-center">
            {/*preguntas[numPreguntaActual].pregunta*/}
          </div>
          <div className="flex justify-around w-full mb-2 gap-1 m-1">
            <div id="res1" className="border-2 border-black rounded-md w-60 h-fit min-h-28 flex flex-col items-center justify-around bg-azul-oscuro text-white"><div className="font-medium">A</div><div>{/*preguntas[numPreguntaActual].respuestaCorrecta*/}</div></div>
            <div id="res2" className="border-2 border-black rounded-md w-60 h-fit min-h-28 flex flex-col items-center justify-around bg-azul-oscuro text-white"><div className="font-medium">B</div><div>{/*preguntas[numPreguntaActual].respuesta1*/}</div></div>
            <div id="res3" className="border-2 border-black rounded-md w-60 h-fit min-h-28 flex flex-col items-center justify-around bg-azul-oscuro text-white"><div className="font-medium">C</div><div>{/*preguntas[numPreguntaActual].respuesta2*/}</div></div>
            <div id="res4" className="border-2 border-black rounded-md w-60 h-fit min-h-28 flex flex-col items-center justify-around bg-azul-oscuro text-white"><div className="font-medium">D</div><div>{/*preguntas[numPreguntaActual].respuesta3*/}</div></div>
          </div>
        </div>
      </header>
      <main className="flex flex-col justify-center h-2/5">
        <div>
          <div className="flex justify-around font-medium mb-2">
            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>D</div>
          </div>
          <div className="flex justify-around flex-grow">
            <div className="flex justify-around w-full mb-2 gap-1 m-1">
              <div id="cont1" className="h-52 w-60 ring-4 ring-azul-oscuro rounded-lg bg-zinc-400 flex flex-col justify-between shadow-lg shadow-azul-oscuro">
                <div className="flex justify-between items-start w-full text-4xl font-semibold">
                  <button onClick={() => handleIncrement(0)}>+</button>
                  <button onClick={() => handleDecrement(0)}>-</button>
                </div>
                <div className="flex justify-center">
                  {puntosApostados[0]}
                </div>
              </div>
              <div id="cont2" className="h-52 w-60 ring-4 ring-azul-oscuro rounded-lg bg-zinc-400 flex flex-col justify-between shadow-lg shadow-azul-oscuro">
                <div className="flex justify-between items-start w-full text-4xl font-semibold">
                  <button onClick={() => handleIncrement(1)}>+</button>
                  <button onClick={() => handleDecrement(1)}>-</button>
                </div>
                <div className="flex justify-center">
                  {puntosApostados[1]}
                </div>
              </div>
              <div id="cont3" className="h-52 w-60 ring-4 ring-azul-oscuro rounded-lg bg-zinc-400 flex flex-col justify-between shadow-lg shadow-azul-oscuro">
                <div className="flex justify-between items-start w-full text-4xl font-semibold">
                  <button onClick={() => handleIncrement(2)}>+</button>
                  <button onClick={() => handleDecrement(2)}>-</button>
                </div>
                <div className="flex justify-center">
                  {puntosApostados[2]}
                </div>
              </div>
              <div id="cont4" className="h-52 w-60 ring-4 ring-azul-oscuro rounded-lg bg-zinc-400 flex flex-col justify-between shadow-lg shadow-azul-oscuro">
                <div className="flex justify-between items-start w-full text-4xl font-semibold">
                  <button onClick={() => handleIncrement(3)}>+</button>
                  <button onClick={() => handleDecrement(3)}>-</button>
                </div>
                <div className="flex justify-center">
                  {puntosApostados[3]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section >
    )}
    </>
  );
}
