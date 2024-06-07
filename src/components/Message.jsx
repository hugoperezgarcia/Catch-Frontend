import React from 'react'
import { LogoClose } from './Icons';

function Message(props) {
    const handleMessage = () =>{
        props.setMensaje();
    }

    return (
        <>
            {props.error ? (
            <> 
                <div className="p-3 rounded-lg bg-red-400 w-5/6 flex flex-row justify-between items-center text-xl m-auto index-2">
                    {props.mensaje}
                    <button className="cursor-pointer" onClick={() => handleMessage()}><LogoClose></LogoClose></button>
                </div>
            </>): (
                <div className="p-3 rounded-lg bg-lime-400 w-full flex flex-row justify-between items-center text-xl">
                    {props.mensaje}
                <button className="cursor-pointer" onClick={() => handleMessage()}><LogoClose></LogoClose></button>
                </div>
          )}
        </>
    )
}

export default Message
