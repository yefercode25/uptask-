import { createContext, useState, useEffect } from 'react';
import { IAlertaValues, IProyectoValues, IProyectoSaveValues, ITareaValues, ITareaSaveValues, IColaboradorValues } from '../types/context/proyectos';
import { ApiService } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';

interface IProyectosContextData {
  proyectos: IProyectoSaveValues[];
  proyecto: IProyectoSaveValues;
  alerta: IAlertaValues;
  mostrarAlerta: (alerta: IAlertaValues) => void;
  submitProyecto: (proyecto: IProyectoValues) => Promise<boolean>;
  obtenerProyecto: (id: string) => Promise<void>;
  cargando: boolean;
  eliminarProyecto: (id: string) => Promise<boolean>;
  modalFormularioTarea: boolean;
  handleModalTarea: () => void;
  submitTarea: (tarea: ITareaValues) => Promise<boolean>;
  tarea: ITareaSaveValues;
  handleModalEditarTarea: (tarea: ITareaSaveValues) => void;
  modalEliminarTarea: boolean;
  handleEliminarTarea: (tarea: ITareaSaveValues) => void;
  EliminarTarea: () => Promise<boolean>;
  submitColaborador: (email: string) => void;
  colaborador: IColaboradorValues;
  agregarColaborador: (email: string) => Promise<boolean>;
  modalEliminarColaborador: boolean;
  handleModdalElminarColaborador: (colab: any) => void;
  eliminarColaborador: () => Promise<boolean>;
  completarTarea: (id: string) => Promise<boolean>;
  buscador: boolean;
  handleBuscador: () => void;
  ioSubmitTarea: (tarea: ITareaSaveValues) => void;
  ioEliminarTarea: (tarea: ITareaSaveValues) => void;
  ioEditarTarea: (tarea: ITareaSaveValues) => void;
  ioCompletarTarea: (tarea: ITareaSaveValues) => void;
  cerrarSesionProyectos: () => void;
}

let socket: Socket;

export const ProyectosContext = createContext<IProyectosContextData>({} as IProyectosContextData);

export const ProyectosProvider = ({ children }: { children: React.ReactNode }) => { 
  const [proyectos, setProyectos] = useState<IProyectoSaveValues[]>([]);
  const [proyecto, setProyecto] = useState<IProyectoSaveValues>({} as IProyectoSaveValues);
  const [alerta, setAlerta] = useState<IAlertaValues>({} as IAlertaValues);
  const [cargando, setCargando] = useState<boolean>(false);
  const [modalFormularioTarea, setmodalFormularioTarea] = useState<boolean>(false);
  const [tarea, setTarea] = useState<ITareaSaveValues>({} as ITareaSaveValues);
  const [modalEliminarTarea, setModalEliminarTarea] = useState<boolean>(false);
  const [colaborador, setColaborador] = useState<IColaboradorValues>({} as IColaboradorValues);
  const [modalEliminarColaborador, setModalEliminarColaborador] = useState<boolean>(false);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState<any>({});
  const [buscador, setBuscador] = useState<boolean>(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerProyectos = async () => { 
      try {
        const { data } = await ApiService.get<IProyectoSaveValues[]>('/proyectos');
        setProyectos(data);
      } catch (_) { 
        console.log('Inicia sesión para administrar los proyectos');
      }
    }

    obtenerProyectos();
  }, [auth]);

  useEffect(() => { 
    socket = io(import.meta.env.VITE_API_SERVICE_URL);
  }, []);

  const mostrarAlerta = (datos: IAlertaValues) => {
    setAlerta(datos);
  }

  const submitProyecto = async (proyectoSave: IProyectoValues): Promise<boolean> => {
    if (proyectoSave.id) {
      return editarProyecto(proyectoSave);
    } else {
      return nuevoProyecto(proyectoSave);
    }
  }

  const nuevoProyecto = async (proyectoSave: IProyectoValues): Promise<boolean> => { 
    try {
      const { data } = await ApiService.post<IProyectoSaveValues>('/proyectos', { ...proyectoSave });
      setProyectos([...proyectos, data]);
      setAlerta({ msg: 'Proyecto creado con éxito', error: false });

      return true;
    } catch (error: any) { 
      setAlerta({ msg: error.response.data.msg, error: true });
      return false;
    }
  }

  const editarProyecto = async (proyectoSave: IProyectoValues): Promise<boolean> => { 
    try {
      const { data } = await ApiService.put<IProyectoSaveValues>(`/proyectos/${proyectoSave.id}`, { ...proyectoSave });
      setProyectos(proyectos.map(proy => proy._id === data._id ? data : proy));
      setAlerta({ msg: 'Proyecto editado con éxito', error: false });

      return true;
    } catch (error: any) { 
      setAlerta({ msg: error.response.data.msg, error: true });
      return false;
    }
  }

  const obtenerProyecto = async (id: string) => { 
    setCargando(true);
    try {
      setAlerta({ msg: '', error: false });
      const { data } = await ApiService.get<IProyectoSaveValues>(`/proyectos/${id}`);
      setProyecto(data);
    } catch (error: any) { 
      setAlerta({ msg: error.response.data.msg, error: true });
      navigate('/proyectos');
      setTimeout(() => {  
        setAlerta({ msg: '', error: false });
      }, 3000);
    } finally {
      setCargando(false);
    }
  }

  const eliminarProyecto = async (id: string): Promise<boolean> => { 
    try {
      const { data } = await ApiService.delete(`/proyectos/${id}`);
      setProyectos(proyectos.filter(proy => proy._id !== id));
      setAlerta({ msg: data.msg, error: false });

      setTimeout(() => {
        setAlerta({ msg: '', error: false });
      } , 3000);

      return true;
    } catch (error: any) {
      setAlerta({ msg: error.response.data.msg, error: true });
      return false;
    }
  }

  const handleModalTarea = () => {
    setmodalFormularioTarea(!modalFormularioTarea);
    setTarea({} as ITareaSaveValues);
  }

  const submitTarea = async (tar: ITareaValues): Promise<boolean> => { 
    if (tar.id) {
      return editarTarea(tar);
    } else {
      return nuevaTarea(tar);
    }
  }

  const nuevaTarea = async (tar: ITareaValues): Promise<boolean> => { 
    try {
      const { data } = await ApiService.post<ITareaSaveValues>(`/tareas`, { ...tar });
      setProyectos(proyectos.map(proy => proy._id === data.proyecto ? { ...proy, tareas: [...proy.tareas, data] } : proy));
      setProyecto({ ...proyecto, tareas: [...proyecto.tareas, data] });
      setAlerta({ msg: 'Tarea creada con éxito', error: false });

      socket.emit('nueva-tarea', { ...data });
      return true;
    } catch (error: any) {
      setAlerta({ msg: error.response.data.msg, error: true });
      return false;
    }
  }

  const editarTarea = async (tar: ITareaValues): Promise<boolean> => {
    try {
      const { data } = await ApiService.put<ITareaSaveValues>(`/tareas/${tar.id}`, { ...tar });
      setProyectos(proyectos.map(proy => proy._id === data.proyecto ? { ...proy, tareas: proy.tareas.map(ta => ta._id === data._id ? data : ta) } : proy));
      setProyecto({ ...proyecto, tareas: proyecto.tareas.map(t => t._id === data._id ? data : t) });
      setAlerta({ msg: 'Tarea editada con éxito', error: false });

      socket.emit('editar-tarea', { ...data });

      return true;
    } catch (error: any) {
      setAlerta({ msg: error.response.data.msg, error: true });
      return false;
    }
  }

  const handleModalEditarTarea = (tar: ITareaSaveValues) => { 
    setTarea(tar);
    setmodalFormularioTarea(!modalFormularioTarea);
  }

  const handleEliminarTarea = (tar: ITareaSaveValues) => { 
    setTarea(tar);
    setModalEliminarTarea(!modalEliminarTarea);
  }

  const EliminarTarea = async (): Promise<boolean> => {
    try {
      await ApiService.delete(`/tareas/${tarea._id}`);
      setProyectos(proyectos.map(proy => proy._id === tarea.proyecto ? { ...proy, tareas: proy.tareas.filter(ta => ta._id !== tarea._id) } : proy));
      setProyecto({ ...proyecto, tareas: proyecto.tareas.filter(t => t._id !== tarea._id) });
      setAlerta({ msg: 'Tarea eliminada con éxito', error: false });
      
      socket.emit('eliminar-tarea', { ...tarea });
      
      return true;
    } catch (error: any) {
      setAlerta({ msg: error.response.data.msg, error: true });
      return false;
    }
  }

  const submitColaborador = async (email: string) => { 
    setCargando(true);
    try {
      const { data } = await ApiService.post<IColaboradorValues>(`/proyectos/colaboradores`, { email });
      setColaborador(data);
      setAlerta({ msg: '', error: false });
    } catch (error: any) {
      setAlerta({ msg: error.response.data.msg, error: true });
      setColaborador({} as IColaboradorValues);
    } finally {
      setCargando(false);
    }
  }

  const agregarColaborador = async (email: string): Promise<boolean> => { 
    try {
      const { data } = await ApiService.post(`/proyectos/colaboradores/${proyecto._id}`, { email });
      setColaborador({} as IColaboradorValues);
      setAlerta({ msg: data.msg, error: false });
      return true;
    } catch (error: any) { 
      setAlerta({ msg: error.response.data.msg, error: true });
      return false;
    }
  }

  const handleModdalElminarColaborador = (colab: any) => { 
    setModalEliminarColaborador(!modalEliminarColaborador);
    setColaboradorSeleccionado(colab);
  }

  const eliminarColaborador = async (): Promise<boolean> => { 
    try {
      const { data } = await ApiService.post(`/proyectos/eliminar-colaboradores/${proyecto._id}`, { id: colaboradorSeleccionado._id });
      setColaboradorSeleccionado({});
      setAlerta({ msg: data.msg, error: false });
      setProyecto({ ...proyecto, colaboradores: proyecto.colaboradores.filter(col => col._id !== colaboradorSeleccionado._id) });
      return true;
    } catch (error: any) {
      setAlerta({ msg: error.response.data.msg, error: true });
      return false;
    }
  }

  const completarTarea = async (id: string): Promise<boolean> => { 
    try {
      const { data } = await ApiService.post<ITareaSaveValues>(`/tareas/estado/${id}`);
      setProyecto({ ...proyecto, tareas: proyecto.tareas.map(t => t._id === id ? { ...data } : t) });
      
      socket.emit('completar-tarea', { ...data });

      return true;
    } catch (error: any) { 
      setAlerta({ msg: error.response.data.msg, error: true });
      return false;
    }
  }

  const handleBuscador = () => {
    setBuscador(!buscador);
  }

  const ioSubmitTarea = (tar: ITareaSaveValues) => {
    setProyecto({ ...proyecto, tareas: [...proyecto.tareas, tar]});
  }

  const ioEliminarTarea = (tar: ITareaSaveValues) => { 
    setProyecto({ ...proyecto, tareas: proyecto.tareas.filter(tar => tar._id !== tar._id)});
  }

  const ioEditarTarea = (tar: ITareaSaveValues) => { 
    setProyecto({ ...proyecto, tareas: proyecto.tareas.map(t => t._id === tar._id ? tar : t)});
  }

  const ioCompletarTarea = (tar: ITareaSaveValues) => {
    setProyecto({ ...proyecto, tareas: proyecto.tareas.map(t => t._id === tar._id ? { ...tar } : t) });
    console.log({ ...proyecto, tareas: proyecto.tareas.map(t => t._id === tar._id ? { ...tar } : t) })
  }

  const cerrarSesionProyectos = async () => { 
    setProyectos([]);
    setProyecto({} as IProyectoSaveValues);
    setAlerta({} as IAlertaValues);
    setmodalFormularioTarea(false);
    setTarea({} as ITareaSaveValues);
    setModalEliminarTarea(false);
    setColaborador({} as IColaboradorValues);
    setModalEliminarColaborador(false);
    setColaboradorSeleccionado({});
    setBuscador(false);
  }

  return (
    <ProyectosContext.Provider
      value={{
        alerta,
        mostrarAlerta,
        proyectos,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        eliminarProyecto,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        tarea,
        handleModalEditarTarea,
        modalEliminarTarea,
        handleEliminarTarea,
        EliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        modalEliminarColaborador,
        handleModdalElminarColaborador,
        eliminarColaborador,
        completarTarea,
        handleBuscador,
        buscador,
        ioSubmitTarea,
        ioEliminarTarea,
        ioEditarTarea,
        ioCompletarTarea,
        cerrarSesionProyectos
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
}