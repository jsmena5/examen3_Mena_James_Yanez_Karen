import type { Investigador, Disponibilidad, Asignacion } from '../interfaces/Investigador';

const API_URL = 'http://localhost:3000/api/investigadores';

export const investigadorService = {
  async getAll(): Promise<Investigador[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener investigadores');
    return res.json();
  },

  create: async (data: Omit<Investigador, 'id'>): Promise<Investigador> => {
  const res = await fetch("http://localhost:3000/api/investigadores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error creando investigador");
  return await res.json();
},

  async registrarDisponibilidad(data: Disponibilidad): Promise<Disponibilidad> {
  const res = await fetch(`${API_URL}/disponibilidad`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al registrar disponibilidad');
  return await res.json(); // 🔹 Devuelve la disponibilidad con su id
},

  async registrarAsignacion(data: Asignacion): Promise<void> {
    const res = await fetch(`${API_URL}/asignacion`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al registrar asignación');
  },
};