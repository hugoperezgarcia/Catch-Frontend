export function Ranking() {
    return (
        <>
            <section className="h-screen flex flex-col bg-gradient-to-br from-purple-500 to-violet-600">
                <header className="flex justify-center p-10 font-medium text-4xl text-white">
                    <h1>RANKING</h1>
                </header>
                <body className="h-full">
                    <div className="h-2/4 flex justify-center items-center">
                        <div class="flex justify-center items-end space-x-0.5">
                            <div class="flex flex-col items-center">
                                <div class="bg-yellow-400 h-40 w-20 shadow-xl rounded-md"></div>
                                <p class="text-center font-bold text-lg text-white">2º</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="bg-yellow-400 h-48 w-20 shadow-xl rounded-md"></div>
                                <p class="text-center font-bold text-lg text-white">1º</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="bg-yellow-400 h-32 w-20 shadow-xl rounded-md"></div>
                                <p class="text-center font-bold text-lg text-white">3º</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-2/4 flex flex-col items-center">
                        <ol class="list-decimal flex flex-col items-start text-white">
                            <li>Juan</li>
                            <li>Pedro</li>
                            <li>Pedro</li>
                            <li>Pedro</li>
                            <li>Pedro</li>
                            <li>Pedro</li>
                            <li>Pedro</li>
                            <li>Pedro</li>
                            <li>Pedro</li>
                            <li>Pedro</li>
                        </ol>
                        <ul className="border-2 border-fuchsia-500 rounded-md p-1 w-11/12 flex justify-center text-white">
                            <li>34.Tu posicion</li>
                        </ul>
                    </div>
                </body>
            </section>
        </>
    );
}