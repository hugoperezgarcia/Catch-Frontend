import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export function ToGame() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const onSubmit = async (data) => {
    //logica de redireccion a sala si existe
    const codigoSala = data.codigo;
    try {
      setLoading(true);
      const response = await axios.get("https://catchit-back-production.up.railway.app/api/partida/" + codigoSala);
      navigate("/sala", { state: { codigoSala } });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loader /> : (
        <section
          className="bg-gradient-to-br from-amber-300 to-yellow-400 h-screen flex items-center justify-center"
          id="toGame"
        >
          <div className="z-10 bg-slate-100 p-8 rounded-lg shadow-lg w-full max-w-md animate-flip-up animate-delay-1000 animate-ease-in-out">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-black">
              Unirse a sala
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="codigo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Codigo de la sala:
                </label>
                {error && (
                  <p className="text-white text-center mt-2 font-semibold bg-red-600 rounded-md w-3/4">
                    {error}
                  </p>
                )}
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  placeholder="123456ABC"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  {...register("codigo")}
                />
              </div>
              <button
                id="boton"
                type="submit"
                className="w-full px-4 py-2 bg-teal-700 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-white"
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
