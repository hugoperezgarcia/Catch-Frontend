import { Link, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import { LogoDelete, LogoHome, LogoEditar } from "./Icons";
import { UseUser } from "../hooks/UseUser";
import Loader from "./Loader";
import { useAxios } from "../context/axiosContext";

function RepositorioAdmin() {
  const { user } = UseUser();
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [partidas, setPartidas] = useState([]);
  const [error, setError] = useState();
  const [caracteristica, setCaracteristica] = useState("all");
  const [mensaje, setMensaje] = useState();
  const axios = useAxios();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        "/admin/" + user
      );
      setUsername(response.data.username);
      setPartidas(response.data.partidas);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePartida = async (idPartida) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        "/partida/" +
        idPartida +
        "/" +
        user
      );
    } catch (error) {
      setError(error);
    } finally {
      getUser();
    }
  };

  const filtrarPartidas = (event) => {
    setFiltro(event.target.value);
    console.log(partidas)
  };

  const partidasFiltradas = partidas.filter((partida) =>{
    if(caracteristica.includes("all") || !caracteristica){
      return(partida.titulo.toLowerCase().includes(filtro.toLowerCase()))
    }else{
      return(partida.preguntas[0][caracteristica].toLowerCase().includes(filtro.toLowerCase()))
    }
  } 
  );

  function switchInicio() {
    const newValue = !sessionStorage.getItem("estaInicio");
    sessionStorage.setItem("estaInicio", newValue);
  }

  const handleSelectChange = (event) => {
    setCaracteristica(event.target.value);
};

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="bg-violet-600 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(202,182,255,1),rgba(255,255,255,0))] h-fit min-h-screen">
          
          <header className="pt-16">
            <div className="text-center p-8">
              <h1 className="font-titulo1 animate-flip-down animate-ease-in-out text-5xl">
                ¡¡HOLA {username.toUpperCase()}!! ESTAS SON TUS PARTIDAS.
              </h1>
            </div>
            <div className="flex justify-between mx-5">
              <input
                className="ms-5 w-3/4 rounded-lg focus:outline-none focus:ring-2 p-4 focus:ring-white"
                type="search"
                placeholder="Buscar partida"
                onChange={filtrarPartidas}
              />
              <div className="flex gap-7 mx-5">
                <svg>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  className="bg-gray-100 outline-none w-full" 
                  type="text"
                  placeholder="Buscar partidas"
                  onChange={filtrarPartidas}
                />
              </div>
              <select className="flex py-3 px-3 text-gray-500 font-semibold cursor-pointer items-center justify-center w-fit rounded" name="filtros"
              onChange={handleSelectChange}>
                <option defaultValue="all" value="all">Todas las partidas</option>
                <option value="asignatura">Asignatura</option>
                <option value="nivel">Nivel</option>
                <option value="dificultad">Dificultad</option>
              </select>
              <div className="bg-purple-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                <span>Buscar</span>
              </div>
              <div>
                {sessionStorage.getItem("estaInicio") ? (
                  <button
                    className="p-3 bg-amber-500	rounded-lg text-white font-semibold"
                    onClick={irRepo}
                  >
                    <LogoHome />
                    Inicio
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </header>
          <main className="flex flex-wrap gap-5 mt-10 ms-10">
            <Link to="/preguntas">
              <div className="rounded-lg p-10 bg-white shadow-xl shadow-violet-700 w-80 h-52 text-xl hover:animate-jump hover:cursor-pointer font-titulo2 font-semibold">
                <h1>VER TODAS LAS PREGUNTAS</h1>
              </div>
            </Link>
            {partidasFiltradas.map((partida) => (
              <div
                key={partida.id}
                className="rounded-lg p-10 bg-white shadow-xl shadow-violet-900 w-80 h-52 text-xl hover:animate-jump hover:cursor-pointer font-titulo2"
              >
                <div className="w-full h-1/2 flex justify-between">
                  <Link to={"/editPartida/" + partida.id}>
                    <div className="w-5">
                      <LogoEditar />
                    </div>
                  </Link>
                  <div className="w-5" onClick={() => deletePartida(partida.id)}>
                    <LogoDelete />
                  </div>
                </div>
                <div className="h-1/2">
                  <h1 className="font-semibold text-2xl uppercase flex justify-center items-start">{partida.titulo}</h1>
                  <p className="flex justify-center items-start">{partida.id}</p>
                </div>
              </div>
            ))}
          </main>
        </section>
      )}
    </>
  );
}

export default RepositorioAdmin;
