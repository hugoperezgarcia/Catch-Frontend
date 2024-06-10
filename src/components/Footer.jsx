export const Footer = () => {
    return (
      <div className="absolute bottom-0 w-full bg-slate-200">
        <svg
          className="absolute top-0 w-full h-2 -mt-1 sm:-mt-5 sm:h-8 text-black"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
        >
          <path
            fill="currentColor"
            d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
          />
        </svg>
        <div className="px-4 pt-6 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="grid gap-16 row-gap-10 mb-0 lg:grid-cols-6">
            <div className="md:max-w-md lg:col-span-2">
            <img src="/LogoStem.png" alt="Logo Stem" className="w-32"/>
              <div className="mt-4 lg:max-w-sm">
                <p className="text-sm text-black">
                  Proyecto impulsado gracias a la financiación y ayuda del proyecto SteMadrid.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
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
          <div className="flex flex-col justify-center pb-2 border-t border-deep-purple-accent-200 sm:flex-row">
            <p className="text-sm text-black">
              © Copyright 2024 CatchIt. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    );
  };