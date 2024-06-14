import { LogoGithub, LogoLinkedin } from "./Icons";

export const Footer = () => {
  return (
    <div className="absolute bottom-0 w-full bg-slate-200 h-[11%]">
      <div className="px-4 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-2 lg:grid-cols-6">
          <a
            className="md:max-w- lg:col-span-3 flex items-center gap-5 text-pretty"
            href="https://www.comunidad.madrid/servicios/educacion/es-stemadrid"
          >
            <img src="/LogoStem.png" alt="Logo Stem" className="h-12" />
            <div className="mt-0 lg:max-w-md">
              <p className="text-sm text-black">
                Proyecto impulsado gracias a la financiación y ayuda del
                proyecto SteMadrid.
              </p>
            </div>
          </a>
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-3 md:grid-cols-4">
            <div></div>
            <div>
              <p className="font-semibold tracking-wide text-black">
                Hugo Moreno
              </p>
              <ul className="mt-1 flex justify-start">
                <li className="transition-colors duration-300 text-black rounded-lg p-1 size-10">
                  <a
                    href="https://github.com/hugomorenoo"
                  >
                    <LogoGithub />
                  </a>
                </li>
                <li className="transition-colors duration-300 text-black rounded-lg p-1 size-10">
                  <a
                    href="www.linkedin.com/in/hugo-moreno-fernández-561b3a2b1"
                  >
                    <LogoLinkedin />
                  </a>
                </li>
              </ul>
            </div>
            <div></div>
            <div>
              <p className="font-semibold tracking-wide text-black">
                Hugo Pérez
              </p>
              <ul className="mt-1 flex justify-start">
                <li className="transition-colors duration-300 text-black rounded-lg p-1 size-10">
                  <a
                    href="https://github.com/hugoooooooooooooooooooooooooooo"
                  >
                    <LogoGithub />
                  </a>
                </li>
                <li className="transition-colors duration-300 text-black rounded-lg p-1 size-10">
                  <a
                    href="https://www.linkedin.com/in/hugo-p%C3%A9rez-garc%C3%ADa-7681ab2b4/"
                  >
                    <LogoLinkedin />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
