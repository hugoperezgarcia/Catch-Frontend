export function Ranking(){
    return(
        <>
        <section className="h-screen flex flex-col"> 
            <header className="flex justify-center p-10 font-medium text-4xl">
                <h1>RANKING</h1>
            </header>
            <main>
                <div className="flex justify-center gap-0.5">
                    <div className="px-20 h-40 rounded-md bg-slate-500 flex justify-center">3</div>
                    <div className="px-20 h-56 rounded-md bg-slate-500 flex justify-center">1</div>
                    <div className="px-20 h-48 rounded-md bg-slate-500 flex justify-center">2</div>
                </div>
                <div className="flex justify-center mt-5">
                    <ol>
                        <li>Pepito</li>
                        <li>Fulano</li>
                        <li>Mengano</li>
                        <li>Juanito</li>
                        <li>Fulanito</li>
                        <li>Fulanito</li>
                        <li>Fulanito</li>
                        <li className="p-2 border-2 rounded-lg border-fuchsia-600">Jugador</li>
                    </ol>
                </div>
            </main>
        </section>
        </>
    );
}