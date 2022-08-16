import { useProyectos } from '../hooks/useProyectos';
interface IColaboradorProps {
  colaborador: any;
}

const Colaborador = ({ colaborador }: IColaboradorProps) => {
  const { nombre, email } = colaborador;
  const { handleModdalElminarColaborador } = useProyectos();
  
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-xl">{nombre}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
      <div>
        <button type="button" className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white uppercase rounded font-bold text-sm" onClick={() => handleModdalElminarColaborador(colaborador)}>
          Eliminar
        </button>
      </div>
    </div>
  )
}
export default Colaborador;