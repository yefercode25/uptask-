import FormularioColaborador from "../components/FormularioColaborador";
import { useProyectos } from '../hooks/useProyectos';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, mostrarAlerta } = useProyectos();
  const { id } = useParams();

  useEffect(() => { 
    obtenerProyecto(id!);
  }, [id]);

  if (cargando) return (<p>Cargando...</p>);
  
  const handleAgregarColaborador = async () => {
    await agregarColaborador(colaborador.email);
    
    setTimeout(() => {  
      mostrarAlerta({ msg: '', error: false });
    }, 3000);
  }

  return (
    <>
      <h1 className="font-black text-4xl">
        Añadir Colaborador(a): {''}
        <span className="font-semibold">{proyecto.nombre}</span>
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

      {cargando ? (
        <p>Cargando...</p>
      ) : colaborador?._id && (
        <div className="flex justify-center mt-10">
            <div className="bg-white p-5 w-full md:w-3/4 rounded shadow">
            <h2 className="text-center mb-5 text-2xl font-bold">Resultado:</h2>
            <div className="flex justify-between items-center">
              <p>{colaborador.nombre}</p>
              <button
                type="button"
                className="bg-slate-500 hover:bg-slate-700 px-5 py-2 rounded uppercase font-bold text-white text-sm"
                onClick={handleAgregarColaborador}
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NuevoColaborador;