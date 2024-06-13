import { HeaderInicio } from "./HeaderInicio.jsx";
import { ToGame } from "./ToGame.jsx";
import { Rules } from "./Rules.jsx";
import { LogIn } from "./LogIn.jsx";
import React from "react";
import { UseUser } from "../hooks/UseUser.jsx";
import RepositorioAdmin from "./RepositorioAdmin.jsx";
import { Footer } from "./Footer.jsx";
import { useEffect } from "react";
import EditPartida from "./EditPartida.jsx";

function Home() {
  const { user } = UseUser();

  useEffect(() => {
    sessionStorage.setItem("estaInicio", true);
  }, []);

  return (
    <div>
      <HeaderInicio />
      <main className="snap-y snap-mandatory relative w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="snap-center">
          <ToGame />
        </div>
        <div className="snap-center">
          <Rules />
        </div>
        <div className="snap-center">
          {user != undefined ? <RepositorioAdmin /> : <LogIn />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
