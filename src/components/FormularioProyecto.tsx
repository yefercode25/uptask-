import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProyectos } from '../hooks/useProyectos';
import Alerta from './Alerta';

const FormularioProyecto = () => {
  const [id, setId] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [fechaEntrega, setFechaEntrega] = useState<string>('');
  const [cliente, setCliente] = useState<string>('');

  const navigate = useNavigate();
  const params = useParams();
  const { alerta, mostrarAlerta, submitProyecto, proyecto } = useProyectos();
  
  useEffect(() => { 
    if (params.id) {
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
      setCliente(proyecto.cliente);
    }
  }, [params]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();

    if([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      mostrarAlerta({ msg: 'Todos los campos son obligatorios', error: true });
      setTimeout(() => {  
        mostrarAlerta({ msg: '', error: false });
      }, 5000);
      return;
    }

    const isCorrect = await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });
    if (isCorrect) {
      setId('');
      setNombre('');
      setDescripcion('');
      setFechaEntrega('');
      setCliente('');

      setTimeout(() => {
        mostrarAlerta({ msg: '', error: false });
        navigate('/proyectos');
      }, 3000);
    }
  }

  return (
    <form className="bg-white py-10 px-5 md:w-full lg:w-3/4 rounded shadow" onSubmit={handleSubmit}>
      {alerta?.msg && (
        <div className="mb-5">
          <Alerta {...alerta} />
        </div>
      )}
      <div className="mb-5">
        <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">
          Nombre del Proyecto
        </label>
        <input
          type="text"
          id="nombre"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded"
          placeholder="Ejm. Creación de una página web"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="descripcion" className="text-gray-700 uppercase font-bold text-sm">
          Descripción del Proyecto
        </label>
        <textarea
          id="nombre"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded"
          placeholder="Ejm. Se requiere una página web para la empresa..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="fecha-entrega" className="text-gray-700 uppercase font-bold text-sm">
          Fecha de Entrega del Proyecto
        </label>
        <input
          type="date"
          id="fecha-entrega"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="cliente" className="text-gray-700 uppercase font-bold text-sm">
          Nombre del Cliente
        </label>
        <input
          type="text"
          id="cliente"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded"
          placeholder="Ejm. Juan Pérez"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={params.id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
        className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded text-sm mt-3 hover:cursor-pointer hover:bg-sky-800 transition-colors"
      />
    </form>
  )
}

export default FormularioProyecto;