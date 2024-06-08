import Pregunta from "./Pregunta";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoHome, LogoAtras, LogoClose } from "./Icons";
import usePreguntas from "../hooks/usePreguntas";
import LoaderIntegrado from "./LoaderIntegrado";
import { useState } from "react";
import { useEffect } from "react";
import Message from "./Message";

function Preguntas() {
  const navigate = useNavigate();
  const location = useLocation();
  const numPreguntas = location.state?.numPreguntas
  const insertedId = location.state?.insertedId
  const editedId = location.state?.editedId;
  const [mensaje, setMensaje] = useState();
  const { preguntasFiltradas, filtrarPreguntas, preguntasUser, loading } = usePreguntas();

  useEffect(() =>{
    if(numPreguntas){
      setMensaje(`Has creado ${numPreguntas} pregunta/s correctamente`)
    }else if(insertedId){
      setMensaje(`Has insertado correctamente la pregunta con id: ${insertedId}`)
    }else if(editedId){
      setMensaje(`Has editado correctamente la pregunta con id: ${editedId}`)
    }
  }, [])

  const goBack = () => {
    sessionStorage.removeItem("estaInicio")
    navigate("/bienvenida");
  };

  return (
    <>
      <section className="bg-violet-600 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(202,182,255,1),rgba(255,255,255,0))] min-h-screen">
        <header>
          <div className="text-center p-8">
            <h1 className="font-titulo1 animate-flip-down animate-ease-in-out text-5xl">
              TODAS LAS PREGUNTAS
            </h1>
          </div>
          <div className="flex justify-between mx-5">
            <button className="w-10" onClick={goBack}>
              <LogoAtras />
            </button>
            <input
              className="ms-5 w-3/4 rounded-lg focus:outline-none focus:ring-2 p-4 focus:ring-violet-100"
              type="search"
              placeholder="Buscar preguntas"
              onChange={filtrarPreguntas}
            />
            <div className="flex gap-7 mx-5">
              <Link
                to="/createPartida"
                className="p-3 bg-violet-100 shadow-md shadow-violet-900  hover:animate-jump rounded-lg hover:bg-violet-100  font-titulo1"
              >
                CREAR PARTIDA
              </Link>
              <Link
                to="/insertarCsv"
                className="p-3 bg-white shadow-md shadow-violet-700 rounded-lg hover:animate-jump font-titulo2 font-titulo1"
              >
                INTRODUCIR CSV
              </Link>
              <Link
                to="/createPregunta"
                className="p-3 bg-violet-100 shadow-md shadow-violet-900  hover:animate-jump rounded-lg hover:bg-violet-100  font-titulo1"
              >
                INTRODUCIR PREGUNTAS
              </Link>
              <Link
                to="/"
                className="p-3 bg-violet-100  hover:animate-jump shadow-md shadow-violet-900 rounded-lg hover:bg-violet-100  font-titulo1"
              >
                <LogoHome />
                Inicio
              </Link>
            </div>
          </div>
        </header>
        <main className="p-10 flex flex-wrap gap-5">
          {mensaje && (
            <Message mensaje={mensaje} setMensaje={setMensaje} />
          )}
          {loading ? (
            <LoaderIntegrado />
          ) : (
            preguntasFiltradas.map((pregunta, index) => {
              const esMia = preguntasUser.some((p) => p.id === pregunta.id);
              if (esMia) {
                return (
                  <Pregunta owner="true" pregunta={pregunta} />
                );
              } else {
                return <Pregunta pregunta={pregunta} />;
              }
            })
          )}
        </main>
      </section>
    </>
  );
}

export default Preguntas;