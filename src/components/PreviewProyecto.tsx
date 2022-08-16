import { Link } from 'react-router-dom';
import { IProyectoSaveValues } from '../types/context/proyectos';
import { useAuth } from '../hooks/useAuth';

interface IPreviewProyectoProps {
  proyecto: IProyectoSaveValues;
}

const PreviewProyecto = ({ proyecto }: IPreviewProyectoProps) => {
  const { auth } = useAuth();
  const { _id, cliente, nombre } = proyecto;

  const isAdmin = auth._id === proyecto.creador;

  return (
    <div className="border-b p-5 flex md:items-center flex-col md:flex-row">
      <p className="flex-1 text-base">
        {nombre} {''}
        <span className="text-sm text-gray-500 uppercase font-semibold">{cliente} {''}</span>
        {!isAdmin && (
          <span className="bg-green-600 py-1 px-2 rounded text-xs uppercase text-white font-bold ml-2">
            Colaborador
          </span>
        )}
      </p>
      <Link to={`${_id}`} className="text-gray-600 hover:text-gray-800 uppercase text-xs font-bold">
        Ver Proyecto
      </Link>
    </div>
  )
}

export default PreviewProyecto;