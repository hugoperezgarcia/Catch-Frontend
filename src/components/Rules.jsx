export function Rules() {
  return (
    <>
      <section
        className="bg-gradient-to-br from-blue-500 to-indigo-700 text-white py-16 h-screen"
        id="rules"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-normal mb-8 mt-16">
            ¿Cómo se juega?
          </h2>
          <p className="text-lg mb-8 p-10 rounded border-2">
            En el juego CatchIt, el objetivo es acumular la mayor
            cantidad de puntos respondiendo correctamente a una serie de
            preguntas a lo largo de varias rondas. Cada jugador comienza con un
            saldo inicial de 1000 puntos, al cual se sumarán 1000 puntos
            adicionales por cada vida extra disponible. Cada ronda consta de 8
            preguntas con un límite de tiempo para responder. Antes de que
            expire el tiempo, los jugadores deben decidir cuántos puntos
            apostarán en cada respuesta. Solo los puntos apostados en respuestas
            correctas serán sumados a la puntuación total del jugador, mientras
            que los puntos apostados en respuestas incorrectas serán restados.
            Al finalizar todas las rondas, se elaborará un ranking con los
            puntajes de todos los jugadores, mostrando un podio con los tres
            primeros lugares, una lista de los diez mejores puntajes y la
            posición del jugador en el ranking general. El jugador con la
            puntuación más alta al término de todas las rondas será declarado el
            ganador. Las vidas extra disponibles otorgan una bonificación de
            1000 puntos adicionales al saldo inicial de cada jugador al inicio
            del juego.
          </p>
        </div>
      </section>
    </>
  );
}
