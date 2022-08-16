import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const { auth } = useAuth();
  const { nombre } = auth;

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="uppercase font-bold text-xl text-gray-700">Hola: {nombre}</p>

      <Link to="crear-proyecto" className="bg-sky-600 w-full p-3 text-white uppercase font-bold block rounded mt-5 text-center">
        Nuevo Proyecto
      </Link>
    </aside>
  )
}

export default Sidebar;