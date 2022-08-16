import { useProyectos } from './useProyectos';
import { useAuth } from './useAuth';

export const useAdmin = (): boolean => { 
  const { proyecto } = useProyectos();
  const { auth } = useAuth();

  return proyecto?.creador === auth._id;
}