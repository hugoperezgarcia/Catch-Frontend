import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoAtras, LogoHome, LogoPuntos } from "./Icons";
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
        <main className="h-screen flex flex-col">
          <div class="absolute top-0 z-[-2] h-screen w-screen bg-violet-600 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(202,182,255,1),rgba(255,255,255,0))]"></div>
          <header className="flex justify-between p-10 font-medium text-6xl text-white">
            <div>
              <button className="w-10" onClick={goBack}><LogoAtras /></button>
            </div>
            <h1 className="bg-violet-400/80 rounded-full py-3 px-5 shadow-md">RANKING</h1>
            <button className="w-10" onClick={() => volver()}><LogoHome /></button>
          </header>
          <div className="h-full flex">
            <div className="w-1/2 flex justify-center items-center">
              <div className="flex justify-center items-end space-x-0.5">
                <div className="flex flex-col items-center">
                  <p className="text-white text-2xl animate-bounce">🥈{jugadores.length > 1 ? jugadores[1].nombre : <div/>}</p>
                  <div className="bg-yellow-400 h-80 w-48 shadow-md rounded-md shadow-violet-300"></div>
                  <p className="text-center font-bold text-3xl text-white">2º</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-white text-3xl animate-bounce">🏆{jugadores.length > 0 ? jugadores[0].nombre : <div/>}</p>
                  <div className="bg-yellow-400 h-96 w-48 shadow-md rounded-md shadow-violet-300"></div>
                  <p className="text-center font-bold text-4xl text-white">1º</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-white text-xl animate-bounce">🥉{jugadores.length > 3 ? jugadores[3].nombre : <div/>}</p>
                  <div className="bg-yellow-400 h-64 w-48 shadow-md rounded-md shadow-violet-300"></div>
                  <p className="text-center font-bold text-2xl text-white">3º</p>
                </div>
              </div>
            </div>
            <div className="h-full flex flex-col items-center w-1/2 justify-center">
              <div className="border p-16 text-2xl rounded-xl bg-violet-400/80 shadow-md shadow-yellow-200">
              <ul className="flex flex-col items-start text-white gap-2">
                {jugadores.map((jugador, index) => {
                  if (id) {
                    if (jugador.id == id) {
                      return (
                        <li
                          className="border-4 border-yellow-500 rounded-md p-2 w-full"
                          key={jugador.id}
                        >
                          {index + 1}.- {jugador.nombre}: {jugador.puntos}{" "}
                        </li>
                      );
                    }else{
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
          </div>
        </main>
      )}
    </>
  );
}
