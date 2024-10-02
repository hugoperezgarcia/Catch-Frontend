import { useLocation, useNavigate } from "react-router-dom";
import { LogoPuntos, LogoSkip, LogoSiVida, LogoNoVida } from "./Icons";
import { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import { useAxios } from "../context/axiosContext";
import { computeHeadingLevel } from "@testing-library/react";

export function CatchIt() {
  //Variables iniciales
  const navigate = useNavigate();
  const location = useLocation();
  const codigoSala = location.state?.codigoSala;
  const nickname = location.state?.nickname;
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  //Variables a pintar
  const [tiempo, setTiempo] = useState();
  const [contadorIniciado, setContadorIniciado] = useState(false);
  const [marcadorPuntos, setMarcadorPuntos] = useState(1000);
  const [rondas, setRondas] = useState();
  const [rondaActual, setRondaActual] = useState(sessionStorage.getItem("ronda"));
  const [vidas, setVidas] = useState();
  const [puntosApostados, setPuntosApostados] = useState([0, 0, 0, 0]);
  const [respuestas, setRespuestas] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [numTrampillaCorrecta, setNumTrampillaCorrecta] = useState();
  const [maxPuntos, setMaxPuntos] = useState();
  const [valoresIniciados, setValoresniciados] = useState(false);
  const [maxVidas, setMaxVidas] = useState([]);
  const puntosActuales = sessionStorage.getItem("puntosJugador");
  const [numPreguntaActual, setNumPreguntaActual] = useState(
    sessionStorage.getItem("numPreguntaActual")
  );
  const [imageUrl, setImageUrl] = useState("");

  const botones = document.querySelectorAll("button");

  //Manejo del back

  //Redirigir si no existe codigo de sala

  useEffect(() => {
    if (!codigoSala) {
      navigate("/");
    } else if (sessionStorage.getItem("idJugador")) {
      navigate("/ranking");
    }
    peticionBD();
  }, []);

  //Coger info de la base de datos
  async function peticionBD() {
    try {
      const respuesta = await axios.get(
        "/partida/" +
        codigoSala
      );
      setRondas(respuesta.data.numRondas);
      if (sessionStorage.getItem("vidas")) {
        setVidas(sessionStorage.getItem("vidas"))
      } else {
        setVidas(respuesta.data.numVidas);
      }
      setPreguntas(respuesta.data.preguntas);
      let arrayVidas = [];
      for (let i = 1; i <= respuesta.data.numVidas; i++) {
        arrayVidas.push(i);
      }
      setMaxVidas(arrayVidas);
      setValoresniciados(true);
    } catch (e) {
      console.log("Error" + e);
    } finally {
      setLoading(false);
    }
  }

  //declaracion de variables fijas una vez hecha la peticion en la bd

  useEffect(() => {
    if (valoresIniciados) {
      cargarNuevaPregunta();
      setTimeout(() => {
        empezarContador();
      }, 3000);
    }
  }, [numPreguntaActual, valoresIniciados]);

  useEffect(() => {
    if (tiempo == 0) {
      deshabilitarBotones();
      quitarAnimacionesRespuestas();
      animarTrampillas();
      setTimeout(function () {
        setPuntosGanados();
        if (Number(numPreguntaActual) + 1 >= preguntas.length) {
          actualizarPuntosJugador();
        } else {
          sessionStorage.setItem(
            "numPreguntaActual",
            Number(numPreguntaActual) + 1
          );
          setNumPreguntaActual(Number(numPreguntaActual) + 1);
        }
      }, 3000);
    }
  }, [contadorIniciado]);


  //Manejo de preguntas y respuestas
  const cargarNuevaPregunta = () => {
    if (marcadorPuntos == 0 && (Number(vidas) - 1) == 0) {
      actualizarPuntosJugador();
    } else {
      if (marcadorPuntos <= 0) {
        sessionStorage.setItem("vidas", (Number(vidas) - 1));
        setVidas(sessionStorage.getItem("vidas"));
        sessionStorage.setItem("puntosJugador", 1000);
        setMaxPuntos(1000);
        setMarcadorPuntos(1000);
      } else {
        setMaxPuntos(puntosActuales);
        setMarcadorPuntos(puntosActuales);
      }
      if (preguntas[numPreguntaActual].imagen) {
        getImagen();
      } else {
        setImageUrl();
        habilitarBotones();
      }
      if (numPreguntaActual >= (rondaActual * 8)) {
        sessionStorage.setItem("ronda", Number(rondaActual) + 1);
        setRondaActual(sessionStorage.getItem("ronda"));
      }
      habilitarBotones();
      setTiempo(preguntas[numPreguntaActual].tiempo);
      setPuntosApostados([0, 0, 0, 0]);
      randomizarRespuestas();
      resetearTrampillas();
      animarPuntos(true);
      setTimeout(() => {
        animarPuntos(false);
      }, 1000);
    };
  }

  const getImagen = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/pregunta/" + preguntas[numPreguntaActual].id + "/foto", { responseType: 'blob', });
      const imageUrl = URL.createObjectURL(response.data);
      setImageUrl(imageUrl)
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }


  const actualizarPuntosJugador = async () => {
    let puntos;
    const puntosGanados = sessionStorage.getItem("puntosJugador");
    if (puntosGanados == 0) {
      puntos = (1000 * (Number(vidas) - 1)) + Number(puntosGanados);
    } else {
      puntos = (1000 * Number(vidas) + Number(puntosGanados));
    }
    try {
      setLoading(true);
      const response = await axios.put("/jugador/" + codigoSala + "/" + nickname + "/" + puntos);
      sessionStorage.setItem("idJugador", response.data.data.id);
      navigate("/ranking", { state: { codigoSala } });
    } catch (e) {
      console.log(e.response.data.errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const randomizarRespuestas = () => {
    const arrayRespuestas = [];
    let respuestaCorrecta;
    Object.keys(preguntas[numPreguntaActual]).forEach((clave) => {
      if (clave.includes("respuesta")) {
        arrayRespuestas.push(preguntas[numPreguntaActual][clave]);
      }
      if (clave.includes("respuestaCorrecta")) {
        respuestaCorrecta = preguntas[numPreguntaActual][clave];
      }
    });
    arrayRespuestas.sort(() => Math.random() - 0.5);

    animarRespuestas(arrayRespuestas);

    setRespuestas(arrayRespuestas);

    getRespuestaCorrecta(arrayRespuestas, respuestaCorrecta);
  };

  function getRespuestaCorrecta(arrayRespuestas, respuestaCorrecta) {
    for (let i = 0; i < arrayRespuestas.length; i++) {
      if (arrayRespuestas[i] === respuestaCorrecta) {
        setNumTrampillaCorrecta(i + 1);
      }
    }
  }

  const setPuntosGanados = () => {
    for (let i = 1; i <= respuestas.length; i++) {
      if (i == numTrampillaCorrecta) {
        sessionStorage.setItem("puntosJugador", puntosApostados[i - 1]);
        setMaxPuntos(puntosApostados[i - 1]);
        setMarcadorPuntos(puntosApostados[i - 1]);
      }
    }
  };

  //Manejo del contador
  function handleSkip() {
    console.log("Se presiona skip");
    setTiempo(0);
  }

  const empezarContador = () => {
    setContadorIniciado(true);
  };

  useEffect(() => {
    let intervalId;

    if (contadorIniciado) {
      intervalId = setInterval(() => {
        setTiempo((prevTiempo) => {
          if (prevTiempo === 0) {
            clearInterval(intervalId);
            setContadorIniciado(false);
            return prevTiempo;
          }
          return prevTiempo - 1;
        });
      }, 1000);
    }

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [contadorIniciado]);

  //Manejo de puntos
  function handleIncrement(index) {
    if (marcadorPuntos >= 100 && marcadorPuntos <= maxPuntos) {
      const newPuntosApostados = puntosApostados;
      newPuntosApostados[index] = Math.min(
        newPuntosApostados[index] + 100,
        maxPuntos
      );
      setPuntosApostados(newPuntosApostados);
      actualizarMarcador(newPuntosApostados);
    }
  }

  function handleDecrement(index) {
    const newPuntosApostados = puntosApostados;
    const restarPuntos = Math.min(newPuntosApostados[index], 100);
    newPuntosApostados[index] -= restarPuntos;
    setPuntosApostados(newPuntosApostados);
    actualizarMarcador(newPuntosApostados);
  }

  function actualizarMarcador(newPuntosApostados) {
    const totalPuntosApostados = newPuntosApostados.reduce(
      (total, puntos) => total + puntos,
      0
    );
    setMarcadorPuntos(maxPuntos - totalPuntosApostados);
  }
  //Manejo de botones
  function deshabilitarBotones() {
    botones.forEach((boton) => {
      boton.disabled = true;
    });
  }

  function habilitarBotones() {
    setTimeout(() => {
      botones.forEach((boton) => {
        boton.disabled = false;
      });
    }, 1000);
  }

  function resetearColorPreguntas() {
    for (let i = 0; i < 8; i++) {
      document
        .getElementById(`numPreg${i}`)
        .classList.replace("border-gre");
      document
        .getElementById(`numPreg${i}`)
        .classList.replace("bg-green-600", "bg-white");
      document.getElementById(`numPreg${i}`).classList.remove("text-white");
    }
  }

  //manejo de animaciones
  function animarTrampillas() {
    for (let i = 1; i <= respuestas.length; i++) {
      if (
        document.getElementById(`cont${i}`) !==
        document.getElementById(`cont${numTrampillaCorrecta}`)
      ) {
        document.getElementById(`cont${i}`).classList.add("animate-flip-up");
        document
          .getElementById(`cont${i}`)
          .classList.add("animate-ease-in-out");
        document.getElementById(`cont${i}`).classList.add("animate-reverse");
      }

      if (document.getElementById(`res${i}`) == document.getElementById(`res${numTrampillaCorrecta}`)) {
        document.getElementById(`res${i}`).classList.replace("bg-purple-800/70", "bg-green-600");
      }
    }
  }

  function resetearTrampillas() {
    for (let i = 1; i <= respuestas.length; i++) {
      if (
        document.getElementById(`cont${i}`) !==
        document.getElementById(`cont${numTrampillaCorrecta}`)
      ) {
        document.getElementById(`cont${i}`).classList.remove("animate-flip-up");
        document
          .getElementById(`cont${i}`)
          .classList.remove("animate-ease-in-out");
        document.getElementById(`cont${i}`).classList.remove("animate-reverse");
      }

      if (document.getElementById(`res${i}`) == document.getElementById(`res${numTrampillaCorrecta}`)) {
        document.getElementById(`res${i}`).classList.replace("bg-green-600", "bg-purple-800/70");
      }
    }
  }

  const animarRespuestas = (arrayRespuestas) => {
    document
      .getElementById("enunciadoPregunta")
      .classList.add("animate-fade-down", "animate-ease-in");
    var delay = 1000;
    for (let i = 1; i <= arrayRespuestas.length; i++) {
      document
        .getElementById("res" + i)
        .classList.add(
          "animate-fade-down",
          "animate-delay-[1500ms]",
          "animate-ease-in"
        );
      delay += 1000;
    }
  };

  const quitarAnimacionesRespuestas = () => {
    document
      .getElementById("enunciadoPregunta")
      .classList.remove("animate-fade-down", "animate-ease-in");

    var delay = 1000;
    for (let i = 1; i <= respuestas.length; i++) {
      document
        .getElementById("res" + i)
        .classList.remove(
          "animate-fade-down",
          "animate-delay-[1500ms]",
          "animate-ease-in"
        );
      delay += 1000;
    }
  };

  function animarPuntos(animar) {
    if (animar) {
      document
        .getElementById("puntos")
        .classList.add("animate-rotate-y", "animate-once", "animate-ease-in");
    } else {
      document
        .getElementById("puntos")
        .classList.remove(
          "animate-rotate-y",
          "animate-once",
          "animate-ease-in"
        );
    }
  }

  return (
    <>
      {loading || !valoresIniciados ? (
        <Loader />
      ) : (
        <section className=" bg-gradient-to-br from-indigo-500 to-purple-500 bg-cover bg-center max-h-screen h-screen text-white">
          <header className="flex justify-between h-[80%]">
            <div className="mx-5">
              <div className="flex items-center">
                <div className="shadow-md shadow-violet-300 rounded-full m-5 flex flex-col justify-center items-center min-w-24 h-24 font-medium text-white bg-purple-800/70 text-5xl animate-pulse animate-infinite animate-ease-in">
                  {tiempo}
                </div>
                <button
                  onClick={() => handleSkip()}
                  className="w-14 shadow-md shadow-violet-300 bg-purple-800/70 flex justify-center rounded-lg font-thin text-white h-9 items-center"
                >
                  <LogoSkip />
                </button>
              </div>
              <div className="flex gap-3 m-2">
                {maxVidas.map((index) => {
                  if (vidas >= index) {
                    return <LogoSiVida />
                  } else {
                    return <LogoNoVida />
                  }
                })}
              </div>
              <div className="flex gap-3 justify-start m-3 text-5xl">
                <div
                  id="puntos"
                  className="animate-rotate-y animate-once animate-ease-in"
                >
                  <LogoPuntos />
                </div>
                <p className="text-black">{marcadorPuntos}</p>
              </div>
              <div className="flex gap-3 justify-start ms-4 m-3 text-4xl font-medium text-black">
                Ronda: {rondaActual}/{rondas}
              </div>
            </div>
            <div className="h-full rounded-lg mt-3 me-5 flex-grow flex flex-col items-center bg-gradient-to-br from-indigo-400 to-purple-400 shadow-lg">
              <div className="flex w-full justify-around mt-2 text-black">
                {preguntas.slice((rondaActual - 1) * 8, rondaActual * 8).map((pregunta, index) => {
                  let restaRonda = 8 * (rondaActual - 1);
                  let numpreg = index; // Ya que estamos usando un slice, index empieza en 0
                  let numpregActual = Number(numPreguntaActual - restaRonda);
                  let id = "numPreg" + numpreg;

                  let className = "rounded-full w-10 h-10 flex justify-center items-center font-medium shadow-sm shadow-violet-300 ";

                  if (numpreg < numpregActual) {
                    className += "bg-green-600 text-white";
                  } else {
                    className += "bg-white";
                  }

                  return (
                    <div id={id} className={className} key={index}>
                      {numpreg + 1}
                    </div>
                  );
                })}
              </div>

              <div
                id="enunciadoPregunta"
                className="p-6 font-medium text-4xl w-full max-w-full h-3/6 flex flex-col justify-between items-center"
              >
                <h1 className="text-pretty">{preguntas[numPreguntaActual].pregunta}</h1>

                {imageUrl && (
                  <div className="my-2">
                    <img src={imageUrl} alt="Imagen del enunciado" className="rounded-md w-auto max-w-96 max-h-64 "></img>
                  </div>
                )}
              </div>
              <div className="h-3/6 w-full max-w-full flex m-2">

                <div className="w-1/2 flex flex-col justify-between items-center">
                  <div
                    id="res1"
                    className="w-[98%] rounded-md h-[48%] min-h-28 flex flex-col items-center justify-around bg-purple-800/70 text-white"
                  >
                    <div className="font-medium">A</div>
                    <div className="m-2">{respuestas[0]}</div>
                  </div>
                  <div
                    id="res2"
                    className="rounded-md w-[98%] h-[48%] min-h-28 flex flex-col items-center justify-around bg-purple-800/70 text-white"
                  >
                    <div className="font-medium">B</div>
                    <div className="m-2">{respuestas[1]}</div>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col justify-between items-center">
                  <div
                    id="res3"
                    className="w-[98%] rounded-md h-[48%] min-h-28 flex flex-col items-center justify-around bg-purple-800/70 text-white"
                  >
                    <div className="font-medium">C</div>
                    <div className="m-2">{respuestas[2]}</div>
                  </div>
                  <div
                    id="res4"
                    className="rounded-md w-[98%] h-[48%] min-h-28 flex flex-col items-center justify-around bg-purple-800/70 text-white"
                  >
                    <div className="font-medium">D</div>
                    <div className="m-2">{respuestas[3]}</div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex flex-col justify-center h-[20%]">
            <div>
              <div className="flex justify-around font-bold mb-2">
                <div>A</div>
                <div>B</div>
                <div>C</div>
                <div>D</div>
              </div>
              <div className="flex justify-around flex-grow">
                <div className="flex justify-around w-full mb-2 gap-1 m-1 items-end">
                  <div
                    id="cont1"
                    className="h-auto min-w-60 w-auto rounded-lg bg-white flex flex-col justify-between shadow-sm shadow-violet-300"
                  >
                    <div className="flex justify-between items-center w-full text-3xl font-semibold">
                      <button
                        className="m-1 border-4 border-green-500 px-1 bg-green-300 rounded-xl h-fit"
                        onClick={() => handleIncrement(0)}
                      >
                        +
                      </button>
                      <div className="flex justify-center text-black">
                        {puntosApostados[0]}
                      </div>
                      <button
                        className="m-1 px-1  border-4 border-red-500 bg-red-300 rounded-xl"
                        onClick={() => handleDecrement(0)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div
                    id="cont2"
                    className="h-auto min-w-60 w-auto  rounded-lg bg-white flex flex-col justify-between shadow-sm shadow-violet-300"
                  >
                    <div className="flex justify-between items-center w-full text-3xl font-semibold">
                      <button
                        className="m-1 border-4 border-green-500 px-1 bg-green-300 rounded-xl"
                        onClick={() => handleIncrement(1)}
                      >
                        +
                      </button>
                      <div className="flex justify-center text-black">
                        {puntosApostados[1]}
                      </div>
                      <button
                        className="m-1 px-1  border-4 border-red-500 bg-red-300 rounded-xl"
                        onClick={() => handleDecrement(1)}
                      >
                        -
                      </button>
                    </div>

                  </div>
                  <div
                    id="cont3"
                    className="h-auto min-w-60 w-auto  rounded-lg bg-white flex flex-col justify-between shadow-sm shadow-violet-300"
                  >
                    <div className="flex justify-between items-center w-full text-3xl font-semibold">
                      <button
                        className="m-1 border-4 border-green-500 px-1 bg-green-300 rounded-xl"
                        onClick={() => handleIncrement(2)}
                      >
                        +
                      </button>
                      <div className="flex justify-center text-black">
                        {puntosApostados[2]}
                      </div>
                      <button
                        className="m-1 px-1  border-4 border-red-500 bg-red-300 rounded-xl"
                        onClick={() => handleDecrement(2)}
                      >
                        -
                      </button>
                    </div>

                  </div>
                  <div
                    id="cont4"
                    className="h-auto min-w-60 w-auto  rounded-lg bg-white flex flex-col justify-between shadow-sm shadow-violet-300 items-center"
                  >
                    <div className="flex justify-between items-center w-full text-3xl font-semibold">
                      <button
                        className="m-1 border-4 border-green-500 px-1 bg-green-300 rounded-xl"
                        onClick={() => handleIncrement(3)}
                      >
                        +
                      </button>
                      <div className="flex justify-center text-black">
                        {puntosApostados[3]}
                      </div>
                      <button
                        className="m-1 px-1  border-4 border-red-500 bg-red-300 rounded-xl"
                        onClick={() => handleDecrement(3)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
      )}
    </>
  );
}
