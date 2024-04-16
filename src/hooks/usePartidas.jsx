import { useState, useEffect } from "react";
import { UseUser } from "./UseUser";

export default function usePartidas(){

    const{user} = UseUser();
    const [filtro, setFiltro] = useState("");

    const filtrarPartidas = (event) => {
        setFiltro(event.target.value);
    }
    
    const partidasFiltradas = user.partidas.filter(partida =>
        partida.titulo.toLowerCase().includes(filtro.toLowerCase())
    );

    return{filtrarPartidas, partidasFiltradas}
}