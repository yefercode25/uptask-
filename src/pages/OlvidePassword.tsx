import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../services/ApiService';
import Alerta from '../components/Alerta';

const OlvidePassword = () => {
  const [email, setEmail] = useState<string>('');
  const [alerta, setAlerta] = useState({ msg: '', error: false });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    
    if (!email) {
      setAlerta({ msg: 'Ingrese el email de la cuenta a restablecer', error: true });
      return;
    }

    try {
      const { data } = await ApiService.post('/usuarios/olvide-password', { email });
      setAlerta({ msg: data.msg, error: false });
      setEmail('');
    } catch (error: any) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera tu acceso y no pierdas {''}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {alerta.msg && <Alerta {...alerta} />}
      
      <form className="mt-10 bg-white shadow rounded px-10 py-5 pb-12" onSubmit={handleSubmit}>
        <div className="my-5">
          <label className="uppercase text-gray-600 block font-black text-xl" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar instrucciones"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded text-xl mt-3 hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/registrar"
          className="block text-center my-5 text-slate-500 hover:text-slate-700 text-sm"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 hover:text-slate-700 text-sm"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </nav>
    </>
  )
}

export default OlvidePassword;