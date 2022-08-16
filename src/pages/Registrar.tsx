import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import { ApiService } from '../services/ApiService';

const Registrar = () => {
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repetirPassword, setRepetirPassword] = useState<string>('');
  const [alerta, setAlerta] = useState({ msg: '', error: false });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    
    if([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: 'Las contraseñas no son iguales', error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: 'La contraseña debe tener al menos 6 caracteres', error: true });
      return;
    }

    setAlerta({ msg: '', error: false });

    try {
      const { data } = await ApiService.post('/usuarios', {
        nombre,
        email,
        password
      });

      setAlerta({ msg: data.msg, error: false });
      
      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
    } catch (error: any) { 
      if(error.response.status === 400) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus {''}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {alerta.msg && <Alerta {...alerta} />}

      <form className="mt-10 bg-white shadow rounded px-10 py-5 pb-12" onSubmit={handleSubmit}>
        <div className="my-5">
          <label className="uppercase text-gray-600 block font-black text-xl" htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Tu nombre de registro"
            className="w-full mt-3 p-3 border rounded bg-gray-50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
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
        <div className="my-5">
          <label className="uppercase text-gray-600 block font-black text-xl" htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña de registro"
            className="w-full mt-3 p-3 border rounded bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block font-black text-xl" htmlFor="password2">Repetir Contraseña</label>
          <input
            type="password"
            id="password2"
            placeholder="Repetir contraseña de registro"
            className="w-full mt-3 p-3 border rounded bg-gray-50"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear cuenta"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded text-xl mt-3 hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 hover:text-slate-700 text-sm"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 hover:text-slate-700 text-sm"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </nav>
    </>
  )
}

export default Registrar;