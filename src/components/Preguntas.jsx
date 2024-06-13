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
  const { preguntasFiltradas, filtrarPreguntas, preguntasUser, loading, handleSelectChange} = usePreguntas();


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
          <div className="flex items-center p-3 mx-10 space-x-6 rounded-lg bg-white justify-between">
            <button className="w-8 h-8" onClick={goBack}>
              <LogoAtras />
            </button>
              <div className="flex w-[90%]">
                <div className="flex bg-gray-100 p-3 w-[90%] space-x-4 rounded-lg">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 opacity-30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  <input
                    className="bg-gray-100 outline-none w-full"
                    type="search"
                    placeholder="Buscar preguntas"
                    onChange={filtrarPreguntas}
                  />
                </div>
                <select className="flex py-3 px-3 mx-2 text-gray-500 font-semibold cursor-pointer items-center justify-center w-fit rounded" name="filtros"
                  onChange={handleSelectChange}>
                  <option defaultValue="pregunta" value="pregunta">Todas las preguntas</option>
                  <option value="asignatura">Asignatura</option>
                  <option value="nivel">Nivel</option>
                  <option value="dificultad">Dificultad</option>
                </select>
              </div>
              <button className="w-8 h-8" onClick={goBack}>
              <LogoHome />
            </button>
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