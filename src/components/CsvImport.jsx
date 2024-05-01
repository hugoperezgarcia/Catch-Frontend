import { useState } from "react";
import axios from 'axios';

export function CsvImport(){
    function handleFileUpload(file) {
        const formData = new FormData();
        formData.append('file', file);
    
        axios.post('http://localhost:8080/api/csv/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Importado correctamente');
        })
        .catch(error => {
            console.error('Error importando CSV:', error);
        });
    }

    return(
        <section className="bg-gradient-to-br from-orange-300 to-rose-600 h-screen">
            <header className="flex justify-center p-10 h-2/5">
                <h1 className="text-5xl font-medium">Importar preguntas con fichero CSV</h1>
            </header>
            <div className="flex flex-col justify-start items-center gap-3 h-3/5">
                <input type="file" name="csv" accept=".csv" className="font-semibold" />
                <button className="bg-red-100 rounded-xl p-2 hover:bg-red-300 font-semibold" onClick={handleFileUpload}>Importar</button>
            </div>
        </section>
    )
}