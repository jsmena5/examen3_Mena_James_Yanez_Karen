export interface Investigador {
  id: number;
  nombre: string;
  apellido: string;
  departamento: string;
  experiencia: number;
}

export interface Disponibilidad {
  id?: number;
  franja_horaria: string;
  modalidad: string;
}

export interface Asignacion {
  investigadorId: number;
  lineaId: number;
  disponibilidadId: number;
}