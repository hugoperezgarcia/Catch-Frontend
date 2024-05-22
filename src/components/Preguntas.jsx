import Pregunta from './Pregunta';
import { Link, useNavigate,  } from 'react-router-dom';
import { LogoHome, LogoAtras } from './Icons';
import usePreguntas from '../hooks/usePreguntas';
import LoaderIntegrado from './LoaderIntegrado';

function Preguntas() {
    const navigate = useNavigate();
    const{preguntasFiltradas, filtrarPreguntas, preguntasUser, loading} = usePreguntas();

    const goBack = () => {
        navigate("/bienvenida");
    };

    return (
        <>
        <section className="bg-violet-600 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(202,182,255,1),rgba(255,255,255,0))] min-h-screen">
        <header>
                <div className="text-center p-8">
                    <h1 className="font-titulo1 animate-flip-down animate-ease-in-out text-5xl">TODAS LAS PREGUNTAS</h1>
                </div>
                <div className="flex justify-between mx-5">
                <button className='w-10' onClick={goBack} >
                    <LogoAtras />
                </button>
                    <input className="ms-5 w-3/4 rounded-lg focus:outline-none focus:ring-2 p-4 focus:ring-violet-100"  type="search" placeholder="Buscar preguntas" onChange={filtrarPreguntas} />
                    <div className="flex gap-7 mx-5">
                        <Link to="/createPartida" className="p-3 bg-violet-100 shadow-md shadow-violet-900  hover:animate-jump rounded-lg hover:bg-violet-100  font-titulo1">CREAR PARTIDA</Link>
                        <Link to="/createPregunta" className="p-3 bg-violet-100 shadow-md shadow-violet-900  hover:animate-jump rounded-lg hover:bg-violet-100  font-titulo1">INTRODUCIR PREGUNTAS</Link>
                        <Link to="/" className="p-3 bg-violet-100  hover:animate-jump shadow-md shadow-violet-900 rounded-lg hover:bg-violet-100  font-titulo1"><LogoHome/>Inicio</Link>
                    </div>
                </div>
            </header>
            <main className="p-10 flex flex-wrap gap-5">
            {loading ? <LoaderIntegrado /> :
                preguntasFiltradas.map((pregunta, index) =>{
                    const esMia = preguntasUser.some(p => p.id === pregunta.id)
                    if(esMia){
                        return (<Pregunta owner="true" pregunta={pregunta} key={index}/>)
                    }else{
                        return (<Pregunta pregunta={pregunta} />)
                    }
                })
            }
            </main>
        </section>
    </>
    )
}

export default Preguntas
