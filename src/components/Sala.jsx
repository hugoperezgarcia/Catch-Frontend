import { LogoHome, LogoAtras, LogoRanking } from "./Icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

export function Sala() {
  const navigate = useNavigate();
  const location = useLocation();
  const codigoSala = location.state?.codigoSala;
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!codigoSala) {
      navigate("/");
    }
  }, [codigoSala, navigate]);

  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(nickname  == ""){
      setError("Es necesario introducir un nickname");
    }else{
      try {
        setLoading(true);
        const response = await axios.put("https://catchit-back-production.up.railway.app/api/pregunta/" + codigoSala + "/" + nickname);
        sessionStorage.setItem("numPreguntaActual", 0);
        sessionStorage.setItem("puntosJugador", 1000);
        sessionStorage.setItem("ronda", 1);
        sessionStorage.removeItem("vidas");
        sessionStorage.removeItem("idJugador");
        navigate("/CatchIt", { state: { nickname, codigoSala } });
      } catch (e) {
        setError(e.response.data.errorMessage);
      } finally {
        setLoading(false);
      }
    }
    
  };

  const handleChange = (event) => {
    setNickname(event.target.value);
  };

  const navigateRanking = () =>{
    navigate("/ranking", { state: { codigoSala } });
  }
  

  return (
    <>
      {loading ? <Loader /> : (
        <section
          className="bg-violet-600 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(202,182,255,1),rgba(255,255,255,0))] h-screen"
          id="toGame"
        >
          <header className="flex justify-between p-8 h-1/5 items-start">
            <button className="w-10" onClick={goBack}>
              <LogoAtras />
            </button>
            <div>
              <h1 className="font-titulo1 animate-flip-down animate-ease-in-out text-5xl border p-3 rounded-full bg-amber-100 shadow-lg shadow-yellow-500">
                SALA {codigoSala}
                {/* Ver el titulo o enunciado de la partida que tiene ese id o
              codigo asociado y ponerlo de titulo */}
              </h1>
            </div>
            <Link className="w-10">
              <LogoHome />
            </Link>
          </header>
          <main className="flex justify-center mt-32">
            <div className="z-10 bg-slate-100 p-8 rounded-lg shadow-xl w-full max-w-md shadow-yellow-500">
              <h2 className="text-3xl font-titulo2 mb-6 text-center text-black">
                Empezar a Jugar
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="codigo"
                    className="block text-sm font-titulo2 text-gray-700 font-semibold"
                  >
                    Nombre:
                  </label>
                  {error && (
                    <p className="text-white text-center my-1 font-semibold bg-red-600 rounded-md">
                      {error}
                    </p>
                  )}
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={nickname}
                    maxLength={15}
                    onChange={handleChange}
                    placeholder="Este nickname saldra luego en el ranking"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  id="boton"
                  type="submit"
                  className="w-full px-4 py-2 bg-yellow-500 hover:bg-violet-700 focus:ring-4 focus:outline-none font-titulo2 rounded-md text-white font-semibold hover:text-lg"
                >
                  ¡A Jugar!
                </button>
              </form>
              <button
                id="boton"
                type="submit"
                className="flex justify-center gap-2 mt-5 w-full px-4 py-2 bg-yellow-500 hover:bg-violet-700 hover:text-lg focus:ring-4 focus:outline-none font-titulo2 rounded-md font-semibold text-white"
                onClick={() => navigateRanking()}
              >
                <div>Ranking</div>
              </button>
            </div>
          </main>
        </section>
      )}
    </>
  );
}
