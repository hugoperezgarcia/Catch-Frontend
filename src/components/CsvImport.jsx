import { useState } from "react";
import { UseUser } from "../hooks/UseUser";
import { set } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { LogoAtras, LogoHome } from "./Icons";
import { useAxios } from "../context/axiosContext";
import Message from "./Message";

export function CsvImport() {
  const [archivo, setArchivo] = useState(null);
  const { user } = UseUser();
  const navigate = useNavigate();
  const axios = useAxios();
  const [error, setError] = useState();

  const [leido, setLeido] = useState(false);

  const handleArchivoChange = (event) => {
    setArchivo(event.target.files[0]); // Actualizar el estado del archivo cuando se seleccione
  };

  const goBack = () => {
    navigate(-1);
  };

  const descargarPlantilla = () => {
    const nombreArchivo = "plantilla.csv";
    const ruta = `${process.env.PUBLIC_URL}/${nombreArchivo}`;

    const linkDescarga = document.createElement("a");
    linkDescarga.href = ruta;
    linkDescarga.download = nombreArchivo;

    document.body.appendChild(linkDescarga);
    linkDescarga.click();
    document.body.removeChild(linkDescarga);
  };

  function handleFileUpload() {
    const formData = new FormData();
    formData.append("archivo", archivo);

    axios
      .post("/preguntacsv/" + user, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Importado correctamente");
        console.log(response.data.data.length);
        const numPreguntas = response.data.data.length;
        navigate("/preguntas", { state: { numPreguntas } });
      })
      .catch((error) => {
        console.error("Error importando CSV:", error);
        setError(
          "Ha habido un error importando el archivo, comprueba que este todo bien."
        );
      });
  }

  const scrollToSection = (sectionId) => {
    if (leido) {
      setLeido(false);
    } else {
      setLeido(true);
      setTimeout(()=>{
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }

  return (
    <section className="bg-violet-600 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(202,182,255,1),rgba(255,255,255,0))] h-screen max-h-screen overflow-y-auto">
      <header className="flex justify-between items-start p-6 sm:p-10 h-[15%]">
        <button className="w-10" onClick={goBack}>
          <LogoAtras />
        </button>
        <h1 className="text-3xl sm:text-5xl font-medium text-center mx-4 sm:mx-0">
          Importar preguntas con fichero CSV
        </h1>
        <div className="w-10">
          <Link to="/">
            <LogoHome />
          </Link>
        </div>
      </header>
      <div className="h-[85%] px-4 sm:px-10">
        <div className="flex flex-col justify-center h-full">
          <div className="flex flex-col items-center w-full">
            <div className="p-6 sm:p-10 bg-violet-100 rounded-md shadow-lg shadow-violet-900 w-full max-w-3xl mx-auto">
              {error && (
                <Message mensaje={error} setMensaje={setError} error={true} />
              )}
              <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-3">
                Instrucciones
              </h1>
              <ul className="text-lg list-disc list-inside">
                <li>Descargar plantilla de excel</li>
                <li>Introducir todas las preguntas</li>
                <li>No eliminar los títulos/enunciados ya puestos</li>
                <li>Guardar la plantilla como archivo (.csv)</li>
                <li>Dar al botón de instrucciones leídas</li>
                <li>Seleccionar tu plantilla ya editada</li>
                <li>Importar la plantilla</li>
              </ul>
              <div className="flex gap-3 items-center mt-5">
                <label htmlFor="checkbox" className="inline-flex items-center p-1 cursor-pointer bg-violet-700 text-violet-100">
                  <input id="checkbox" type="checkbox" className="hidden peer" onClick={() => scrollToSection('ver')} />
                  <span className="px-4 py-2 dark:bg-violet-400 peer-checked:dark:bg-violet-700">OFF</span>
                  <span className="px-4 py-2 dark:bg-violet-700 peer-checked:dark:bg-violet-600">ON</span>
                </label>
                <label htmlFor="checkbox" className="text-lg font-semibold">
                  He leído las instrucciones
                </label>
              </div>
                <button
                  id="descarga"
                  className="bg-violet-500 p-2 rounded mt-5 hover:bg-violet-300 hover:border-2 hover:border-fuchsia-900 font-semibold"
                  onClick={descargarPlantilla}
                >
                  Descargar plantilla
                </button>
            </div>
          </div>
        </div>
        {leido ? (
          <div className="flex justify-center w-full mx-auto my-10 pb-10 sm:max-w-lg">
            <div className="flex flex-col items-center justify-center w-full h-auto bg-violet-100 sm:w-3/4 sm:rounded-lg sm:shadow-xl p-6" id="ver">
              <div className="mt-5 mb-5 text-center">
                <h2 className="text-xl font-semibold mb-2">Subir tu archivo</h2>
                <p className="text-xs text-gray-700">El archivo solo puede ser .csv</p>
              </div>
              <form action="#" className="w-full h-32 max-w-xs mb-10 bg-violet-50 rounded-lg shadow-inner">
                <input type="file" id="file-upload" className="hidden" accept=".csv" onChange={handleArchivoChange} />
                <label htmlFor="file-upload" className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
                  <p className="z-10 text-xs font-light text-center text-gray-700">Arrastra el archivo o haz click</p>
                  <svg className="z-10 w-8 h-8 text-violet-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                  </svg>
                </label>
              </form>
              <button
                className="bg-violet-500 p-2 rounded mt-1 hover:bg-violet-300 hover:border-2 hover:border-fuchsia-900 font-semibold"
                onClick={handleFileUpload}
              >
                Importar
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </section>

  );
}
