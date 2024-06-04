import { Link } from "react-router-dom"
import { LogoHome } from "./Icons"

export function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-2  w-full fixed z-30 bottom-0 ">
      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Proyecto impulsado por</span><br />
          <img src="/LogoStem.png" alt="Logo de stem" className="w-24"/>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="#" className="hover:text-yellow-300">
            Creado por <strong>Hugo Moreno.</strong>
          </Link>
          |
          <Link href="#" className="hover:text-yellow-300">
          Creado por <strong>Hugo Pérez.</strong>
          </Link>
        </div>
      </div>
    </footer>
  )
}