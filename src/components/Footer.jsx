export const Footer = () => {
    return (
      <div className="absolute bottom-0 w-full bg-slate-200 h-[11%]">
        <div className="px-4 pt-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid gap-16 row-gap-10 mb-0 lg:grid-cols-6">
            <a className="md:max-w- lg:col-span-3 flex items-center gap-5 text-pretty" href="https://www.comunidad.madrid/servicios/educacion/es-stemadrid">
              <img src="/LogoStem.png" alt="Logo Stem" className="h-12"/>
              <div className="mt-4 lg:max-w-md">
                <p className="text-sm text-black">
                  Proyecto impulsado gracias a la financiación y ayuda del proyecto SteMadrid.
                </p>
              </div>
            </a>
            <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-3 md:grid-cols-4">
              <div></div>
              <div>
                <p className="font-semibold tracking-wide text-teal-accent-400">
                  Hugo Moreno
                </p>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href="/"
                      className="transition-colors duration-300 text-black hover:font-semibold hover:bg-slate-400 rounded-lg p-1"
                    >
                      Portfolio
                    </a>
                  </li>
                </ul>
              </div>
              <div></div>
              <div>
                <p className="font-semibold tracking-wide text-black">
                  Hugo Pérez
                </p>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href="/"
                      className="transition-colors duration-300 text-black hover:font-semibold hover:bg-slate-400 rounded-lg p-1"
                    >
                      Portfolio
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