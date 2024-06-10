import React from "react";
import { LogoClose } from "./Icons";

function Message(props) {
  const handleMessage = () => {
    props.setMensaje();
  };

  return (
    <>
      {props.error ? (
        <>
          <div class="bg-red-50 border-b border-red-400 text-red-800 text-sm p-4 flex justify-between w-full">
            <div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p>
                  <span class="font-bold">Error:  </span>
                  {props.mensaje}
                </p>
              </div>
            </div>
            <div>
            <button className="cursor-pointer" onClick={() => handleMessage()}>
              <LogoClose></LogoClose>
            </button>
            </div>
          </div>
        </>
      ) : (
        <div class="bg-green-50 border-b border-green-400 text-green-800 text-sm p-4 flex justify-between w-full">
            <div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p>
                  <span class="font-bold">Info:  </span>
                  {props.mensaje}
                </p>
              </div>
            </div>
            <div>
            <button className="cursor-pointer" onClick={() => handleMessage()}>
              <LogoClose></LogoClose>
            </button>
            </div>
        </div>


      )}
    </>
  );
}

export default Message;
