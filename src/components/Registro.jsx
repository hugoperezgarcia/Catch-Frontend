import { useId } from "react";
import { useForm } from "react-hook-form";
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LogoHome } from './Icons';
import Loader from './Loader';
import { useAxios } from '../context/axiosContext';

function Registro() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const axios = useAxios();

    const onSubmit = async (info) => {
        if (info.password === info.passwordRepeated) {
            try {
                setLoading(true);
                const response = await axios.post("/signin", null, {
                    params: {
                        username: info.username,
                        password: info.password,
                        key: info.key
                    }
                });
                navigate("/login");
            } catch (e) {
                if (e.response.status === 400) {
                    setError("La clave de administrador no es correcta");
                } else {
                    setError("Error de conexión, compruebe la conexión a internet");
                }
            } finally {
                setLoading(false);
            }
        } else {
            setError("Las contraseñas no son iguales, vuelve a intentarlo")
        }
    }
    const usernameId = useId()
    const passwordId = useId()
    const claveAdminId = useId()
    const repitePasswordId = useId()

    return (
        <>
            {loading ? <Loader /> : (
                <section className="bg-gradient-to-br from-fuchsia-600 to-violet-800 h-screen">
                    <header className='flex justify-end p-3'>
                        <div className='w-10'>
                            <Link to="/"><LogoHome /></Link>
                        </div>
                    </header>
                    <main className='flex justify-center'>
                        <div className="bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-lg shadow-md w-full max-w-md">
                            <h2 className="text-3xl font-titulo1 mb-6 text-center">Regístrate</h2>

                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor={usernameId} className="block text-sm font-titulo2 text-gray-700">Nombre de Usuario:</label>
                                    <input type="text" id={usernameId} name="username" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        {...register("username")} />
                                </div>

                                <div>
                                    <label htmlFor={repitePasswordId} className="block text-sm font-titulo2 text-gray-700">Contraseña:</label>
                                    <input type="password" id={repitePasswordId} name="password" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        {...register("password")} />
                                </div>

                                <div>
                                    <label htmlFor={passwordId} className="block text-sm font-titulo2 text-gray-700">Repite la Contraseña:</label>
                                    <input type="password" id={passwordId} name="passwordRepeated" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        {...register("passwordRepeated")} />
                                </div>

                                <div>
                                    <label htmlFor={claveAdminId} className="block text-sm font-titulo2 text-gray-700">Clave de administrador:</label>
                                    <input type="text" id={claveAdminId} name="key" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        {...register("key")} />
                                </div>

                                <button type="submit" className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-4h00 focus:ring-4 focus:outline-none focus:ring-blue-300 font-titulo2 rounded-md text-white">Registrar Cuenta</button>
                                <Link to="/login" className="flex justify-center transition-transform transform hover:scale-110 hover:cursor-pointer">Volver al Inicio de Sesión</Link>
                            </form>
                        </div>
                    </main>
                </section>
            )}
        </>
    );
}

export default Registro