import { Link, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import { LogoDelete, LogoHome, LogoEditar} from "./Icons";
import { UseUser } from "../hooks/UseUser";
import axios from "axios";
import Loader from "./Loader";

function RepositorioAdmin() {
  const { user } = UseUser();
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [partidas, setPartidas] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://catchit-back-production.up.railway.app/api/admin/" + user
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
        "https://catchit-back-production.up.railway.app/api/partida/" +
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

  const partidasFiltradas = partidas.filter((partida) => (
    partida.titulo.toLowerCase().includes(filtro.toLowerCase())
  ));

  function switchInicio() {
    const newValue = !sessionStorage.getItem("estaInicio");
    sessionStorage.setItem("estaInicio", newValue);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="bg-gradient-to-br from-orange-300 to-rose-600 h-fit min-h-screen">
          <header className="pt-16">
            <div className="text-center p-8">
              <h1 className="font-titulo1 animate-flip-down animate-ease-in-out text-5xl">
                HOLA {username.toUpperCase()}, ESTAS SON TUS PARTIDAS
              </h1>
            </div>
            <div className="flex justify-between mx-5">
              <input
                className="ms-5 w-3/4 rounded-lg focus:outline-none focus:ring-2 p-4 focus:ring-red-300"
                type="search"
                placeholder="Buscar partida"
                onChange={filtrarPartidas}
              />
              <div className="flex gap-7 mx-5">
                <Link
                  to="/createPartida"
                  className="p-3 bg-red-200 rounded-lg hover:bg-red-300 font-titulo2"
                >
                  CREAR PARTIDA
                </Link>
                <Link
                  to="/insertarCsv"
                  className="p-3 bg-red-200 rounded-lg hover:bg-red-300 font-titulo2"
                >
                  INTRODUCIR CSV
                </Link>
                <Link
                  to="/createPregunta"
                  className="p-3 bg-red-200 rounded-lg hover:bg-red-300 font-titulo2"
                >
                  INTRODUCIR PREGUNTAS
                </Link>
                
                {!sessionStorage.getItem("estaInicio") ? (
                  <Link
                    to="/"
                    onClick={switchInicio}
                    className="p-3 bg-red-200 rounded-lg hover:bg-red-300 font-titulo2"
                  >
                    <LogoHome />
                    Inicio
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </header>
          <main className="flex flex-wrap gap-5 mt-10 ms-10">
            <Link to="/preguntas">
              <div className="rounded-lg p-10 bg-red-200 w-80 h-52 text-xl hover:bg-red-300 hover:cursor-pointer font-titulo2">
                <h1>VER TODAS LAS PREGUNTAS</h1>
              </div>
            </Link>
            {partidasFiltradas.map((partida) => (
              <div
                key={partida.id}
                className="rounded-lg p-10 bg-red-200 w-80 h-52 text-xl hover:bg-red-300 hover:cursor-pointer font-titulo2"
              >
                <h1>{partida.titulo}</h1>
                <p>{partida.id}</p>
                <div className="w-5" onClick={() => deletePartida(partida.id)}>
                  <LogoDelete />
                </div>
                <Link to={"/editPartida/" + partida.id}>
                  <div className="w-5">
                    <LogoEditar />
                  </div>
                </Link>
              </div>
            ))}
          </main>
        </section>
      )}
    </>
  );
}

export default RepositorioAdmin;
