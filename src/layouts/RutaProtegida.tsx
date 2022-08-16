import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      {auth?._id ? (
        <div className="bg-gray-100">
          <Header />
          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <div className="flex-1 p-10">
              <Outlet />
            </div>
          </div>
        </div>
      ) : <Navigate to="/" />}
    </>
  )
}

export default RutaProtegida;