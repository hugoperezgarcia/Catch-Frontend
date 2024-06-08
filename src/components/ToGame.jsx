import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../context/axiosContext";
import Loader from "./Loader";
import Message from "./Message";

export function ToGame() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const axios = useAxios();


  const onSubmit = async (data) => {
    //logica de redireccion a sala si existe
    const codigoSala = data.codigo;
    try {
      setLoading(true);
      const response = await axios.get("/partida/" + codigoSala);
      navigate("/sala", { state: { codigoSala } });
    } catch (e) {
      setError("No existe la sala")
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loader /> : (
        <section
          className="h-screen flex items-center justify-center"
          id="toGame"
        >
          <div class="absolute top-0 z-[-2] h-screen w-screen bg-yellow-600 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(247,255,0,1),rgba(255,255,255,0))]"></div>
          <div className="z-10 bg-violet-100 p-8 rounded-xl shadow-md w-full max-w-md animate-flip-up animate-delay-1000 animate-ease-in-out shadow-violet-500">
            <h2 className="text-3xl font-titulo2 mb-6 text-center text-black">
              Unirse a sala
            </h2>
            {error && (
                <Message mensaje={error} setMensaje={setError} error={true}/>
            )}
            <form className="space-y-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="codigo"
                  className="block text-sm font-titulo2 text-gray-700 font-semibold"
                >
                  Codigo de la sala:
                </label>
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  placeholder="123456ABC"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-amber-800"
                  {...register("codigo")}
                />
              </div>
              <button
                id="boton"
                type="submit"
                className="w-full px-4 py-2 bg-purple-600 hover:bg-violet-800 focus:ring-4 focus:outline-none font-titulo2 rounded-md text-white"
              >
                ¡A Jugar!
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}