import { useContext } from 'react';
import { ProyectosContext } from '../context/ProyectosProvider';

export const useProyectos = () => useContext(ProyectosContext);