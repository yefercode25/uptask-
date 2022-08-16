import { createContext, useState, useEffect } from 'react';
import { IAuthValues } from '../types/context/auth';
import { ApiService } from '../services/ApiService';
import { useLocation, useNavigate } from 'react-router-dom';

interface IAuthContextData { 
  auth: IAuthValues;
  setAuth: (auth: IAuthValues) => void;
  cargando: boolean;
  cerrarSesionAuth: () => void;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => { 
  const [auth, setAuth] = useState<IAuthValues>({} as IAuthValues);
  const [cargando, setCargando] = useState<boolean>(true);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  useEffect(() => { 
    const autenticarUsuario = async () => { 
      const token = localStorage.getItem('token') || '';
      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const { data } = await ApiService('/usuarios/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setAuth({ ...data, token });
        
        if (pathname === '/') navigate('/proyectos');
      } catch (error: any) {
        console.log(error.response.data.msg);
        setAuth({} as IAuthValues);
      } finally {
        setCargando(false);
      }
    }

    autenticarUsuario();
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({} as IAuthValues);
    setCargando(false);
    localStorage.clear();
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando, cerrarSesionAuth }}>
      {children}
    </AuthContext.Provider>
  );
}