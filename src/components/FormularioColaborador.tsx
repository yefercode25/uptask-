import { useState, FormEvent } from 'react';
import { useProyectos } from '../hooks/useProyectos';
import Alerta from './Alerta';

const FormularioColaborador = () => {
  const [email, setEmail] = useState<string>('');
  
  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    
    if(!email.trim()) {
      mostrarAlerta({ msg: 'El email es obligatorio', error: true });
      return;
    }

    submitColaborador(email);
  }

  return (
    <form className="bg-white p-5 w-full md:w-3/4 rounded shadow" onSubmit={handleSubmit}>
      {alerta?.msg && (
        <div className="mb-10">
          <Alerta {...alerta} />
        </div>
      )}
      <div className="mb-5">
        <label htmlFor="email" className="text-gray-700 uppercase font-bold text-sm">
          Email del colaborador(a)
        </label>
        <input
          type="email"
          id="email"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded"
          placeholder="Ejm. colaborador@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value={'Buscar colaborador'}
        className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded text-sm mt-2 hover:cursor-pointer hover:bg-sky-800 transition-colors"
      />
    </form>
  )
}

export default FormularioColaborador;