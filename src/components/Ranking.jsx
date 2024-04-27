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
                                <p className="text-white animate-bounce">Hugo P. 💩</p>
                                <div class="bg-yellow-400 h-40 w-20 shadow-xl rounded-md"></div>
                                <p class="text-center font-bold text-lg text-white">2º</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <p className="text-white animate-bounce">Hugo M. ⭐</p>
                                <div class="bg-yellow-400 h-48 w-20 shadow-xl rounded-md"></div>
                                <p class="text-center font-bold text-lg text-white">1º</p>
                            </div>
                            <div class="flex flex-col items-center">
                                <p className="text-white animate-bounce">Elon Musk</p>
                                <div class="bg-yellow-400 h-32 w-20 shadow-xl rounded-md"></div>
                                <p class="text-center font-bold text-lg text-white">3º</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-2/4 flex flex-col items-center w-full">
                        <ul class="flex flex-col items-center text-white w-4/5 bg-violet-800 rounded-xl">
                            <li>4. Juan</li>
                            <li>5. Pedro</li>
                            <li>6. Pedro</li>
                            <li>7. Pedro</li>
                            <li>8. Pedro</li>
                            <li>9. Pedro</li>
                            <li>10. Pedro</li>
                            <li className="border-4 border-yellow-500 rounded-md p-1 flex justify-center text-white w-full">34. Tu posicion</li>
                        </ul>
                    </div>
                </body>
            </section>
        </>
    );
}