export const formaterFecha = (fecha: string): string => {
  const fechaFormateada = new Date(fecha.split('T')[0].split('-').toString());
  return fechaFormateada.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}