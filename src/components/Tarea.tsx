import { ITareaSaveValues } from '../types/context/proyectos';
import { formaterFecha } from '../helpers/formater-fecha';
import { useProyectos } from '../hooks/useProyectos';
import { useAdmin } from '../hooks/useAdmin';

interface ITareaProps {
  tarea: ITareaSaveValues
}

const Tarea = ({ tarea }: ITareaProps) => {
  const isAdmin = useAdmin();
  const { handleModalEditarTarea, handleEliminarTarea, completarTarea } = useProyectos();
  const { nombre, descripcion, prioridad, fechaEntrega, _id, estado, completado } = tarea;

  return (
    <div className="border-b p-5 flex justify-between items-center gap-4">
      <div>
        <p className="text-xl">{nombre}</p>
        <p className="text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="text-sm text-gray-500 uppercase">{formaterFecha(fechaEntrega)}</p>
        <p className="text-sm text-gray-500 uppercase">Prioridad: {prioridad}</p>
        {estado && (
          <p className="text-xs text-white uppercase bg-green-600 inline-block py-1 px-2 rounded">Completado por: {completado.nombre}</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-4 flex-wrap">
        {isAdmin && (
          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-white uppercase rounded font-bold text-sm" onClick={() => handleModalEditarTarea(tarea)}>
            Editar
          </button>
        )}
    
        <button
          className={`${estado ? 'bg-sky-600 hover:bg-sky-700' : 'bg-gray-600 hover:bg-gray-700'} px-4 py-2 text-white uppercase rounded font-bold text-sm`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? 'Completa' : 'Incompleta'}
        </button>
        
        {isAdmin && (
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white uppercase rounded font-bold text-sm" onClick={() => handleEliminarTarea(tarea)}>
            Eliminar
          </button>
        )}
      </div>
    </div>
  )
}

export default Tarea;