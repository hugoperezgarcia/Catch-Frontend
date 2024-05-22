import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function usePregunta(id){
    const[pregunta, setPregunta] = useState({});
    const [loadingEdit, setLoading] = useState(false);

    const getPregunta = async (id) =>{
        try{   
            setLoading(true);
            const response = await axios.get("https://proyectaipv.es/catchit/api/pregunta/" + id);
            setPregunta(response.data);
        }catch (e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(id){
            getPregunta(id);
        }
    }, [])

    return{pregunta, loadingEdit}
}