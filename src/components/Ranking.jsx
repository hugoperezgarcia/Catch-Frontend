import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoHome, LogoPuntos, LogoRanking } from "./Icons";
import Loader from "./Loader";

export function Ranking() {
  const location = useLocation();
  const codigoSala = location.state?.codigoSala;
  const id = sessionStorage.getItem("idJugador");

  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (codigoSala && id) {
      getRanking();
    } else {
      navigate("/");
    }
  }, []);

  const getRanking = async () => {
    try {
      const response = await axios.get(
        "https://catchit-back-production.up.railway.app/api/partida/" +
        codigoSala
      );
      const arrayJugadores = response.data.jugadores.sort((a, b) => b.puntos - a.puntos);
      console.log(arrayJugadores);
      setJugadores(arrayJugadores);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const volver = () => {
    Object.keys(sessionStorage).forEach(key => {
      if (key != "userId") {
        sessionStorage.removeItem(key);
      }
    });
    navigate("/")
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="h-screen flex flex-col bg-gradient-to-br from-purple-500 to-violet-600">
          <header className="flex justify-between p-10 text-white">
            <div></div>
            <h1 className="flex items-center gap-3 font-medium text-4xl">RANKING</h1>
            <button onClick={() => volver()} className=" hover:animate-jump"><LogoHome />Inicio</button>
          </header>
          <div className="h-full">
            <div className="h-2/4 flex justify-center items-center">
              <div className="flex justify-center items-end space-x-0.5">
                <div className="flex flex-col items-center">
                  <h2 className="text-white animate-bounce">🥈{jugadores.length > 1 ? jugadores[1].nombre : ""}</h2>
                  <div className="bg-yellow-400 h-40 w-20 shadow-xl rounded-md"></div>
                  <p className="text-center font-bold text-lg text-white">2º</p>
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="text-white animate-bounce">🏆{jugadores.length > 0 ? jugadores[0].nombre : ""}</h2>
                  <div className="bg-yellow-400 h-48 w-20 shadow-xl rounded-md"></div>
                  <p className="text-center font-bold text-lg text-white">1º</p>
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="text-white animate-bounce">🥉{jugadores.length > 2 ? jugadores[2].nombre : ""}</h2>
                  <div className="bg-yellow-400 h-32 w-20 shadow-xl rounded-md"></div>
                  <p className="text-center font-bold text-lg text-white">3º</p>
                </div>
              </div>
            </div>
            <div className="h-2/4 flex flex-col items-center">
              <ul className="flex flex-col items-start text-white">
                {jugadores.map((jugador, index) => {
                  if (jugador.id == id) {
                    return (<li
                      className="border-2 border-fuchsia-500 rounded-md p-1 flex justify-start min-w-64 text-white"
                      key={jugador.id}
                    >
                      {(index + 1)}.- {jugador.nombre}: {jugador.puntos}
                    </li>);
                  } else {
                    if (index < 10) {
                      return (<li key={jugador.id}>
                        {(index + 1)}.- {jugador.nombre}: {jugador.puntos}
                      </li>)
                    }
                  }
                })}
              </ul>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
