import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseUser } from '../hooks/UseUser.jsx';

export function AsideRepo() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const loadingRef = useRef(null);
  const{user, setUser} = UseUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingRef.current) {
      loadingRef.current.classList.add("hidden");
    }
    setTimeout(() =>{
      setIsSidebarOpen(true);
    }, [200])
  }, []);

  function switchInicio() {
    const newValue = !sessionStorage.getItem("estaInicio");
    sessionStorage.setItem("estaInicio", newValue);
  }

  const cerrarSesion = () =>{
    sessionStorage.clear();
    setUser();
    navigate("/");
}

  return (
    <div>
      <div
        ref={loadingRef}
        className="inset-0 z-50 flex items-center justify-center text-2xl font-semibold text-white bg-blue-600"
      >
        Loading...
      </div>

      <div
        className={`fixed inset-y-0 z-10 flex w-80 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <svg
          className="absolute inset-0 w-full h-full text-purple-600"
          style={{ filter: "drop-shadow(10px 0 10px #00000030)" }}
          preserveAspectRatio="none"
          viewBox="0 0 309 800"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
        </svg>
        <div className="z-10 flex flex-col flex-1">
          <div className="flex items-center justify-between flex-shrink-0 w-64 p-4">
            <h1 className="text-4xl font-semibold">Catch It!</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-lg focus:outline-none focus:ring"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <nav className="flex flex-col flex-1 w-64 p-4 mt-4">
              <Link to="/" onClick={switchInicio}>
                <a href="#" className="flex items-center space-x-2 hover:text-white px-2 py-5 font-titulo2 font-semibold">
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </a>
              </Link>
            <div className="flex flex-col gap-10">
              <Link
                to="/createPartida"
                className="shadow-violet-700 p-2 hover:translate-x-5 hover:text-white font-titulo2 font-semibold"
              >
                CREAR PARTIDA
              </Link>
              <Link
                to="/insertarCsv"
                className="shadow-violet-700 p-2 hover:translate-x-5 hover:text-white font-titulo2 font-semibold"
              >
                INTRODUCIR CSV
              </Link>
              <Link
                to="/createPregunta"
                className="shadow-violet-700 p-2 hover:translate-x-5 hover:text-white font-titulo2 font-semibold"
              >
                INTRODUCIR PREGUNTAS
              </Link>
              <Link to="/preguntas">
              <div className="shadow-violet-700 p-2 hover:translate-x-5 hover:text-white font-titulo2 font-semibold">
                <h1>VER TODAS LAS PREGUNTAS</h1>
              </div>
            </Link>
            </div>
          </nav>
          <div className="flex-shrink-0 p-4">
            <button className="flex items-center space-x-2" onClick={cerrarSesion}>
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
      <main className="flex flex-col items-center justify-center flex-1">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed p-2 text-purple-900 shadow-lg bg-purple-400 rounded-lg top-5 left-5"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="sr-only">Open menu</span>
        </button>
      </main>
    </div>
  );
}
