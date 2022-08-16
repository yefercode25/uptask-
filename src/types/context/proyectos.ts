export interface IAlertaValues {
  msg: string;
  error: boolean;
}

export interface IProyectoValues { 
  id?: string;
  nombre: string;
  descripcion: string;
  fechaEntrega: string;
  cliente: string;
}

export interface IProyectoSaveValues {
  _id: string;
  nombre: string;
  descripcion: string;
  fechaEntrega: string;
  cliente: string;
  colaboradores: any[];
  tareas: ITareaSaveValues[];
  creador: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IProyectoInfoValues { 
  proyecto: IProyectoSaveValues;
  tareas: any[];
}

export interface ITareaValues {
  id?: string;
  nombre: string;
  descripcion: string;
  fechaEntrega: string;
  prioridad: string;
  proyecto: string;
}

export interface ITareaSaveValues {
  _id: string;
  nombre: string;
  descripcion: string;
  fechaEntrega: string;
  prioridad: string;
  proyecto: string;
  estado: boolean;
  completado: { _id: string, nombre: string };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IColaboradorValues { 
  _id: string;
  nombre: string;
  email: string;
}