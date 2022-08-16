import { useEffect, useState, FormEvent } from 'react';
import Alerta from '../components/Alerta';
import { useParams, Link } from 'react-router-dom';
import { ApiService } from '../services/ApiService';

const NuevoPassword = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordModificado, setPasswordModificado] = useState<boolean>(false);
  const [alerta, setalerta] = useState({ msg: '', error: false });
  const { token } = useParams();  

  useEffect(() => { 
    const comprobarToken = async () => { 
      try {
        await ApiService.get(`/usuarios/olvide-password/${token}`);
      } catch (error: any) { 
        setalerta({ msg: error.response.data.msg, error: true });
      }
    }

    comprobarToken();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();

    if(!password) {
      setalerta({ msg: 'La nueva contraseña no puede estar vacio', error: true });
      return;
    }

    if (password.length < 6) {
      setalerta({ msg: 'La nueva contraseña debe tener al menos 6 caracteres', error: true });
      return;
    }

    try {
      const { data } = await ApiService.post(`/usuarios/olvide-password/${token}`, { password });
      setalerta({ msg: data.msg, error: false });
      setPasswordModificado(true);
      setPassword('');
    } catch (error: any) {
      setalerta({ msg: error.response.data.msg, error: true });
      setPasswordModificado(false);
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablece tu password y no pierdas el acceso a tus {''}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {alerta.msg && <Alerta {...alerta} />}
      {alerta.error && (
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 hover:text-slate-700 text-sm"
        >
          Ir a la página de inicio de sesión
        </Link>
      )}

      {!alerta.error && (
        <form className="mt-10 bg-white shadow rounded px-10 py-5 pb-12" onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block font-black text-xl" htmlFor="password">Nueva Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Tú nueva contraseña"
              className="w-full mt-3 p-3 border rounded bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar nueva contraseña"
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded text-xl mt-3 hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}

      {passwordModificado && (
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 hover:text-slate-700 text-sm"
        >
          Iniciar sesión
        </Link>
      )}
    </>
  )
}

export default NuevoPassword;