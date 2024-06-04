import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useAxios } from "../context/axiosContext";

export default function usePregunta(id){
    const[pregunta, setPregunta] = useState({});
    const [loadingEdit, setLoading] = useState(false);
    const axios = useAxios();

    const getPregunta = async (id) =>{
        try{   
            setLoading(true);
            const response = await axios.get("/pregunta/" + id);
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