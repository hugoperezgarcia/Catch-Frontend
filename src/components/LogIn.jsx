import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useAxios } from '../context/axiosContext';
import { UseUser } from '../hooks/UseUser';
import Loader from './Loader';
import { HeaderInicio } from "./HeaderInicio";

export function LogIn() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const { setUser } = UseUser();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const axios = useAxios();
    const [estainicio, setEstaInicio] = useState();
    
    const onSubmit = async (info) => {
        try {
            setLoading(true);
            const response = await axios.get("/login", {
                params: {
                    username: info.username,
                    password: info.password
                }
            });
            setError();
            sessionStorage.setItem("userId", response.data.id);
            setUser(response.data.id);
            navigate("/bienvenida");
        } catch (e) {
            setError("Credenciales inválidas, vuelve a intentarlo")
        } finally {
            setLoading(false);
            sessionStorage.removeItem("estaInicio");
        }
    }

    useEffect(()=>{
        setEstaInicio(sessionStorage.getItem("estaInicio"));
    },[sessionStorage.getItem("estaInicio")]);

    return (
        <>
            {loading ? <Loader /> : (
                <section className="bg-violet-600 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(202,182,255,1),rgba(255,255,255,0))] h-screen" id="admin">
                    <header className='flex justify-end h-1/5 items-start'>
                    {estainicio ? "" : <HeaderInicio registro={true}/>}
                    </header>
                    <main className='flex justify-center items-center'>
                        <div className="bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-lg shadow-md w-full max-w-md">
                            <h2 className="text-3xl font-titulo2 mb-6 text-center">Inicia Sesión</h2>

                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="username" className="block text-sm font-titulo2 text-gray-700 font-semibold">Usuario:</label>
                                    <input type="text" id="username" name="username" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        {...register("username")} />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-titulo2 text-gray-700 font-semibold">Contraseña:</label>
                                    <input type="password" id="password" name="password" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        {...register("password")} />
                                </div>

                                <button type="submit" className="w-full px-4 py-2 bg-amber-500/90 hover:bg-amber-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-titulo2 rounded-md text-white">Iniciar Sesión</button>
                                <Link to="/registro" className="flex justify-center hover:animate-jump" href="#">¿No tienes cuenta? Regístrate</Link>
                            </form>
                        </div>
                    </main>
                </section>
            )}
        </>
    )
}