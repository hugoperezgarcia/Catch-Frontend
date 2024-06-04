import { useState } from "react";
import { UseUser } from "../hooks/UseUser";
import { set } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { LogoAtras, LogoHome } from "./Icons";
import { useAxios } from "../context/axiosContext";

export function CsvImport() {
  const [archivo, setArchivo] = useState(null);
  const { user } = UseUser();
  const navigate = useNavigate();
  const axios = useAxios();

  const [leido, setLeido] = useState(false);

  const handleArchivoChange = (event) => {
    setArchivo(event.target.files[0]); // Actualizar el estado del archivo cuando se seleccione
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleCheckbox = () => {
    if (leido) {
      setLeido(false);
    } else {
      setLeido(true);
    }
  };

  const descargarPlantilla = () => {
    const nombreArchivo = 'plantilla.csv';
    const ruta = `${process.env.PUBLIC_URL}/${nombreArchivo}`;

    const linkDescarga = document.createElement('a');
    linkDescarga.href = ruta;
    linkDescarga.download = nombreArchivo;

    document.body.appendChild(linkDescarga);
    linkDescarga.click();
    document.body.removeChild(linkDescarga);
  }

  function handleFileUpload() {
    const formData = new FormData();
    formData.append("archivo", archivo);

    axios
      .post(
        "/preguntacsv/" +
        user,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Importado correctamente");
        console.log(response.data.data.length);
        const numPreguntas = response.data.data.length;
        navigate("/preguntas",{ state: {numPreguntas} });
      })
      .catch((error) => {
        console.error("Error importando CSV:", error);
        alert("Ha habido un error importando el archivo, comprueba que este todo bien.")
      });
  }

  return (
    <section className="bg-violet-600 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(202,182,255,1),rgba(255,255,255,0))] h-screen">
      <header className="flex justify-between items-start p-10 h-1/5">
        <button className="w-10" onClick={goBack}>
          <LogoAtras />
        </button>
        <h1 className="text-5xl font-medium">
          Importar preguntas con fichero CSV
        </h1>
        <div className="w-10">
          <Link to="/">
            <LogoHome />
          </Link>
        </div>
      </header>
      <div className="h-4/5 flex flex-col justify-center">
        <div className="flex flex-col items-center w-full">
          <div className="border-2 p-10 bg-violet-300 rounded-md shadow-lg shadow-violet-900">
            <h1 className="text-3xl font-semibold text-center mb-3">
              Intrucciones
            </h1>
            <ul className="text-lg">
              <li>- Decargar plantilla de excel</li>
              <li>- Introducir todas las preguntas</li>
              <li>- No eliminar los títulos/enunciados ya puestos</li>
              <li>- Guardar la plantilla como archivo (.csv)</li>
              <li>- Dar al botón de instrucciones leídas</li>
              <li>- Seleccionar tu plantilla ya editada</li>
              <li>- Importar la plantilla</li>
            </ul>
            <div className="flex justify-center items-center mt-4">
              <input
                type="checkbox"
                id="checkbox"
                className="mr-2 size-6"
                onClick={handleCheckbox}
              />
              <label htmlFor="checkbox" className="text-lg">He leído las instrucciones</label>
            </div>
          </div>
        </div>
        {leido ? (
          <div className="flex flex-col justify-start items-center gap-3 h-fit mt-9">
            <input
              type="file"
              name="csv"
              accept=".csv"
              className="font-semibold text-lg mb-2"
              onChange={handleArchivoChange}
            />
            <button
              className="bg-violet-200 p-2 rounded-xl mt-1 hover:bg-violet-300 hover:border-2 hover:border-fuchsia-900 font-semibold"
              onClick={handleFileUpload}
            >
              Importar
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-full items-center mt-9">
            <label htmlFor="descarga" className="font-semibold text-xl mb-2">
              Descargar plantilla para csv
            </label>
            <button
              id="descarga"
              className="bg-violet-200 p-2 rounded-xl mt-1 hover:bg-violet-300 hover:border-2 hover:border-fuchsia-900 font-semibold"
              onClick={descargarPlantilla}
            >
              Descargar
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
