import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoHome, LogoPuntos, LogoAtras } from "./Icons";
import Loader from "./Loader";

export function Ranking() {
  const location = useLocation();
  const codigoSala = location.state?.codigoSala;
  const id = sessionStorage.getItem("idJugador");

  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (codigoSala) {
      getRanking();
    } else {
      navigate("/");
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const getRanking = async () => {
    try {
      const response = await axios.get(
        "https://catchit-back-production.up.railway.app/api/partida/" +
        codigoSala
      );
      console.log(response.data);
      const arrayJugadores = response.data.jugadores.sort(
        (a, b) => b.puntos - a.puntos
      );
      setJugadores(arrayJugadores);
      console.log(arrayJugadores);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="h-screen flex flex-col bg-gradient-to-br from-purple-500 to-violet-600">
          <header className="flex justify-between p-10 font-medium text-4xl text-white">
            <button className="w-10" onClick={goBack}>
              <LogoAtras />
            </button>
            <div className="font-titulo2">
              <h1>RANKING</h1>
            </div>
            <div className="w-10">
              <Link to="/">
                <LogoHome />
              </Link>
            </div>
          </header>
          <div className="h-full">
            <div className="h-2/4 flex justify-center items-center">
              <div className="flex justify-center items-end space-x-0.5">
                <div className="flex flex-col items-center">
                  <p className="text-white animate-bounce">🥈{jugadores[1].nombre}</p>
                  <div className="bg-yellow-400 h-40 w-20 shadow-xl rounded-md"></div>
                  <p className="text-center font-bold text-lg text-white">2º</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-center text-white animate-bounce">🏆{jugadores[0].nombre}</p>
                  <div className="bg-yellow-400 h-48 w-20 shadow-xl rounded-md"></div>
                  <p className="text-center font-bold text-lg text-white">1º</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-center text-white animate-bounce">🥉{jugadores[2].nombre}</p>
                  <div className="bg-yellow-400 h-32 w-20 shadow-xl rounded-md"></div>
                  <p className="text-center font-bold text-lg text-white">3º</p>
                </div>
              </div>
            </div>
            <div className="h-2/4 flex flex-col items-center min-h-fit">
              <ul className="flex flex-col items-start text-white gap-2 text-lg">
                {jugadores.map((jugador, index) => {
                  if (id) {
                    if (jugador.id == id) {
                      return (
                        <li
                          className="border-2 border-fuchsia-500 rounded-md p-1 w-11/12 flex justify-center text-white"
                          key={jugador.id}
                        >
                          {index + 1}.- {jugador.nombre}: {jugador.puntos}{" "}
                        </li>
                      );
                    } else {
                      if (index < 10) {
                        return (
                          <li key={jugador.id}>
                            {index + 1}.- {jugador.nombre}: {jugador.puntos}{" "}
                          </li>
                        );
                      }
                    }
                  } else {
                    if (index < 10) {
                      return (
                        <li key={jugador.id}>
                          {index + 1}.- {jugador.nombre}: {jugador.puntos}{" "}
                        </li>
                      );
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
