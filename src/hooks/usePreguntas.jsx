import { useState, useEffect } from "react";
import { UseUser } from "./UseUser";
import { useAxios } from "../context/axiosContext";

export default function usePreguntas(){
    const[preguntas, setPreguntas] = useState([]);
    const[preguntasUser, setPreguntasUser] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [caracteristica, setCaracteristica] = useState("pregunta");
    const {user} = UseUser();
    const [loading, setLoading] = useState(false);
    const axios = useAxios();

    const getPreguntas = async () =>{
        try{
            setLoading(true);
            const response = await axios.get("/preguntas");
            setPreguntas(response.data);
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    const getPreguntasUser = async () =>{
        try{
            const response = await axios.get("/preguntaAdmin/" + user);
            setPreguntasUser(response.data);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() =>{
        getPreguntas();
        getPreguntasUser();
    }, []);

    const preguntasFiltradas = preguntas.filter(pregunta =>{
        return((pregunta[caracteristica].toLowerCase().includes(filtro.toLowerCase())))
    }
    );

    const filtrarPreguntas = (event) => {
        setFiltro(event.target.value)
    }

    const handleSelectChange = (event) => {
        setCaracteristica(event.target.value);
    };

    return {preguntasFiltradas, filtrarPreguntas, preguntasUser, loading, handleSelectChange}
}