import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProyectos } from '../hooks/useProyectos';
import FormularioProyecto from '../components/FormularioProyecto';

const EditarProyecto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { obtenerProyecto, proyecto, cargando, eliminarProyecto } = useProyectos();

  useEffect(() => {
    obtenerProyecto(id!);
  }, []);

  const { nombre, _id } = proyecto;

  const handleClickDelete = async () => { 
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      if (await eliminarProyecto(_id)) {
        setTimeout(() => {  
          navigate('/proyectos');
        }, 3000);
      }
    }
  }

  if (cargando) return (<p>'Cargando...'</p>);

  return (
    <>
      <div className="flex gap-2 justify-between items-center">
        <h1 className="font-black text-4xl">
          Editar Proyecto: {''}
          <span className="font-semibold">{nombre}</span>
        </h1>
        <div className="flex items-center gap-2 text-red-400 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <button className="uppercase font-bold" onClick={handleClickDelete}>Eliminar</button>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  )
}

export default EditarProyecto;