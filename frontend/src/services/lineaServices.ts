import type { Linea } from '../interfaces/Linea';

const API_URL = 'http://localhost:3000/api/lineas'; // Ajusta si usas otra base URL

export const getLineas = async (): Promise<Linea[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener líneas de investigación');
  }
  return await response.json();
};

export const createLinea = async (data: { nombre: string; area: string }): Promise<Linea> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al crear línea');
  }

  return await response.json(); // 🔹 devuelve la línea creada con su id
};