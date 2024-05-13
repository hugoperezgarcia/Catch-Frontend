import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

function EditPartida() {
  const { idPartida } = useParams();
  const [loader, setLoader] = useState(true);
  const [partida, setPartida] = useState();
  const [preguntas, setPreguntas] = useState();

  useEffect(() => {
    getPartida();
  }, []);

  const getPartida = async () => {
    try {
      const response = await axios.get(
        "https://catchit-back-production.up.railway.app/api/partida/" +
          idPartida
      );
      setPartida(response.data);
      setPreguntas(response.data.preguntas);
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <>
            <h1>{partida.título}</h1>
            <h3>{partida.id}</h3>
            <p>Número de vidas: {partida.numVidas}</p>
            <p>Número de rondas: {partida.numRondas}</p>
          </>
          <br/>
          <h1>PREGUNTAS</h1>
          <ul>
            {preguntas.map((pregunta) => (
                <li>{pregunta.pregunta}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default EditPartida;
