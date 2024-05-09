import {  useState } from "react";
import axios from "axios";
import { UseUser } from "../hooks/UseUser";
import { set } from "react-hook-form";
import { useNavigate, useParams,Link } from 'react-router-dom';
import { LogoAtras, LogoHome } from './Icons';

export function CsvImport() {
  const [archivo, setArchivo] = useState(null);
  const { user } = UseUser();
  const navigate = useNavigate();

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

  function handleFileUpload() {
    const formData = new FormData();
    formData.append("archivo", archivo);

    axios
      .post(
        "https://catchit-back-production.up.railway.app/api/preguntacsv/" +
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
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error importando CSV:", error);
      });
  }

  return (
    <section className="bg-gradient-to-br from-orange-300 to-rose-600 h-screen">
      <header className="flex justify-between items-start p-10 h-2/5">
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
      <div className="flex flex-col items-center w-full">
        <div className="border-2 p-10 bg-red-300 rounded-md">
          <h1 className="text-xl font-semibold text-center mb-3">
            Intrucciones
          </h1>
          <ul>
            <li>- Decargar plantilla de excel</li>
            <li>- Introducir todas las preguntas</li>
            <li>- No eliminar los titulos/enunciados ya puestos</li>
            <li>- Guardar la plantilla como archivo (.csv)</li>
            <li>- Dar al boton de instrucciones leidas</li>
            <li>- Seleccionar tu plantilla ya editada</li>
            <li>- Importar la plantilla</li>
          </ul>
          <div className="flex justify-center items-center mt-4">
            <input
              type="checkbox"
              id="checkbox"
              className="mr-2 size-4"
              onClick={handleCheckbox}
            />
            <label htmlFor="checkbox">He leido las instrucciones</label>
          </div>
        </div>
      </div>
      {leido ? (
        <div className="flex flex-col justify-start items-center gap-3 h-fit mt-9">
          <input
            type="file"
            name="csv"
            accept=".csv"
            className="font-semibold"
            onChange={handleArchivoChange}
          />
          <button
            className="bg-red-100 rounded-xl p-2 hover:bg-red-300 font-semibold"
            onClick={handleFileUpload}
          >
            Importar
          </button>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center mt-9">
          <label htmlFor="descarga" className="font-semibold">
            Descargar plantilla para csv
          </label>
          <button id="descarga" className="bg-red-100 p-2 rounded-xl mt-1">
            Descargar
          </button>
        </div>
      )}
    </section>
  );
}
