import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ApiService } from '../services/ApiService';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {
  const { token } = useParams();
  const [alerta, setAlerta] = useState({ msg: '', error: false });

  useEffect(() => { 
    const confirmarCuenta = async () => { 
      try {
        const { data } = await ApiService.get(`/usuarios/confirmar/${token}`);
        setAlerta({ msg: data.msg, error: false });
      } catch (error: any) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
    }

    confirmarCuenta();
  }, []);

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y comienza a crear tus {''}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <div className="bg-white mt-10 p-5 rounded shadow">
        {alerta.msg && <Alerta {...alerta} />}
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 hover:text-slate-700"
        >
          Iniciar sesión
        </Link>
      </div>
    </>
  )
}

export default ConfirmarCuenta;