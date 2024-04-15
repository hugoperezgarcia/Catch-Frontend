import { useState, useEffect } from "react";
import axios from "axios";
import { UseUser } from "./UseUser";

export default function usePreguntas(){
    const[preguntas, setPreguntas] = useState([]);
    const[preguntasUser, setPreguntasUser] = useState([]);
    const [filtro, setFiltro] = useState("");
    const {user} = UseUser();

    const getPreguntas = async () =>{
        try{
            const response = await axios.get("https://catchit-back-production.up.railway.app/api/preguntas");
            setPreguntas(response.data);
        }catch(e){
            console.log(e);
        }
    }

    const getPreguntasUser = async () =>{
        try{
            const response = await axios.get("http://localhost:8080/api/preguntaAdmin/" + user.id);
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
        pregunta.pregunta.toLowerCase().includes(filtro.toLowerCase())
    );

    const filtrarPreguntas = (event) => {
        setFiltro(event.target.value)
    }

    return {preguntasFiltradas, filtrarPreguntas, preguntasUser}
}