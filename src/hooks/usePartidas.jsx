import { useState, useEffect } from "react";
import { UseUser } from "./UseUser";

export default function usePartidas(){

    const{user} = UseUser();
    const [filtro, setFiltro] = useState("")
    const [partidasFiltradas, setPartidasFiltradas] = useState([]);

    const filtrarPartidas = (event) => {
        setFiltro(event.target.value)
    }

    useEffect(() => {
        setPartidasFiltradas(user.partidas.filter(partida =>
            partida.nombre.toLowerCase().includes(filtro.toLowerCase())
        ));
    }, []);

    return{filtrarPartidas, partidasFiltradas}
}