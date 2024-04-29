import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoPuntos } from "./Icons";
import Loader from "./Loader";

export function Ranking() {
  const location = useLocation();
  const codigoSala = location.state?.codigoSala;
  const id = location.state?.idJugador;

  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if(codigoSala && id){
        getRanking();
    }else{
        navigate("/");
    }
  }, []);

  const getRanking = async () => {
    try {
      const response = await axios.get(
        "https://catchit-back-production.up.railway.app/api/partida/" +
          codigoSala
      );
      console.log(response.data);
      const arrayJugadores = response.data.jugadores.sort((a, b) => b.puntos - a.puntos);
      setJugadores(arrayJugadores);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="h-screen flex flex-col bg-gradient-to-br from-purple-500 to-violet-600">
          <header className="flex justify-center p-10 font-medium text-4xl text-white">
            <h1>RANKING</h1>
          </header>
          <Link to={"/"}>Volver al inicio</Link>
          <div className="h-full">
            <div className="h-2/4 flex justify-center items-center">
              <div className="flex justify-center items-end space-x-0.5">
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-400 h-40 w-20 shadow-xl rounded-md"></div>
                  <p className="text-center font-bold text-lg text-white">2º</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-400 h-48 w-20 shadow-xl rounded-md"></div>
                  <p className="text-center font-bold text-lg text-white">1º</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-400 h-32 w-20 shadow-xl rounded-md"></div>
                  <p className="text-center font-bold text-lg text-white">3º</p>
                </div>
              </div>
            </div>
            <div className="h-2/4 flex flex-col items-center">
              <ol className="list-decimal flex flex-col items-start text-white">
                {jugadores.map((jugador) => {
                    console.log(jugador);
                  if (jugador.id == id) {
                    return(<li
                        className="border-2 border-fuchsia-500 rounded-md p-1 w-11/12 flex justify-center text-white"
                        key={jugador.id}
                      >
                        {jugador.nombre}: {jugador.puntos} <LogoPuntos />
                      </li>);
                  } else {
                    return(<li key={jugador.id}>
                        {jugador.nombre}: {jugador.puntos} <LogoPuntos />
                      </li>)
                  }
                })}
              </ol>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
