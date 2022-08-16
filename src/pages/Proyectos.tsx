import PreviewProyecto from '../components/PreviewProyecto';
import { useProyectos } from '../hooks/useProyectos';
import Alerta from '../components/Alerta';

const Proyectos = () => {
  const { proyectos, alerta } = useProyectos();

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      {alerta.msg && <Alerta {...alerta} />}
      
      <div className="bg-white shadow mt-10 rounded">
        {proyectos?.length ? (
          proyectos.map(proyecto => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
            <p className="text-center uppercase font-bold text-red-800 p-5">
            No tienes ningún proyecto registrado, crea uno rapidamente.  
          </p>
        )}
      </div>
    </>
  )
}

export default Proyectos;