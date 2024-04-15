import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function usePregunta(id){
    const[pregunta, setPregunta] = useState({});

    const getPregunta = async (id) =>{
        try{   
            const response = await axios.get("https://catchit-back-production.up.railway.app/api/pregunta/" + id);
            setPregunta(response.data);
        }catch (e){
            console.log(e);
        }
    }

    useEffect(() => {
        if(id){
            getPregunta(id);
            console.log(pregunta);
        }
    }, [])

    return{pregunta}
}