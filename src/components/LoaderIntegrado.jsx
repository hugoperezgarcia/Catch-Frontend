export default function LoaderIntegrado(){
    return(
        <div className="flex gap-2 m-auto">
            <div className="animate-bounce animate-ease-in-out rounded-full h-20 w-20 bg-white"></div>
            <div className="animate-bounce animate-delay-[250ms] animate-ease-in-out rounded-full h-20 w-20 bg-white"></div>
            <div className="animate-bounce animate-delay-[500ms] animate-ease-in-out rounded-full h-20 w-20 bg-white"></div>
        </div>
    );
}