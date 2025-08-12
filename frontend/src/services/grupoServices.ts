// services/grupoServices.ts
import type { Grupo } from '../interfaces/Grupo';

const API_URL = 'http://localhost:3000/api/grupos';

interface GetGruposParams {
  linea?: string;
  disponibilidad?: string;
}

export const getGrupos = async (params?: GetGruposParams): Promise<Grupo[]> => {
  const queryParams = new URLSearchParams();

  if (params?.linea) queryParams.append('linea', params.linea);
  if (params?.disponibilidad) queryParams.append('disponibilidad', params.disponibilidad);

  const url = queryParams.toString() ? `${API_URL}?${queryParams.toString()}` : API_URL;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener grupos');
  }
  return await response.json();
};