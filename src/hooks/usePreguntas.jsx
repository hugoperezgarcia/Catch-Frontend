import { useState, useEffect } from "react";
import axios from "axios";
import { UseUser } from "./UseUser";

export default function usePreguntas(){
    const[preguntas, setPreguntas] = useState([]);
    const[preguntasUser, setPreguntasUser] = useState([]);
    const [filtro, setFiltro] = useState("");
    const {user} = UseUser();
    const [loading, setLoading] = useState(false);

    const getPreguntas = async () =>{
        try{
            setLoading(true);
            const response = await axios.get("https://proyectaipv.es/catchit/api/preguntas");
            setPreguntas(response.data);
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    const getPreguntasUser = async () =>{
        try{
            const response = await axios.get("http://proyectaipv.es/catchit/api/preguntaAdmin/" + user);
            setPreguntasUser(response.data);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() =>{
        getPreguntas();
        getPreguntasUser();
    }, []);

    const preguntasFiltradas = preguntas.filter(pregunta =>
        (pregunta.pregunta.toLowerCase().includes(filtro.toLowerCase()) || pregunta.asignatura.toLowerCase().includes(filtro.toLowerCase()))
    );

    const filtrarPreguntas = (event) => {
        setFiltro(event.target.value)
    }

    return {preguntasFiltradas, filtrarPreguntas, preguntasUser, loading}
}