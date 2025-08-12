import pool from '../config/db.js';

class Investigador {
  constructor({ id, nombre, apellido, departamento, experiencia }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.departamento = departamento;
    this.experiencia = experiencia;
  }

  // Crear investigador
 static async create(data) {
  const { nombre, apellido, departamento, experiencia } = data;

  if (!nombre || !apellido || !departamento || experiencia === undefined) {
    throw new Error('Datos incompletos para registrar investigador');
  }

  // Ejecutamos la función y obtenemos el resultado con el ID
  const result = await pool.query(
    'SELECT * FROM registrar_investigador($1, $2, $3, $4)',
    [nombre, apellido, departamento, experiencia]
  );

  // Retornamos el primer registro (debería ser solo uno)
  return result.rows[0];
}

  // Obtener todos
  static async getAll() {
    const result = await pool.query('SELECT * FROM obtener_investigadores()');
    return result.rows.map(row => new Investigador(row));
  }

  // Registrar disponibilidad
  static async registrarDisponibilidad(data) {
    const { franja_horaria, modalidad } = data;
    if (!franja_horaria || !modalidad) {
      throw new Error('Datos incompletos para registrar disponibilidad');
    }
    const result = await pool.query(
      'SELECT * FROM registrar_disponibilidad($1, $2)',
      [franja_horaria, modalidad]
    );
    return result.rows[0]; // retorna la fila creada (id, franja, modalidad)
  }

  // Registrar asignación (investigador, línea, disponibilidad)
  static async registrarAsignacion(data) {
    const { investigador_id, linea_id, disponibilidad_id } = data;
    if (!investigador_id || !linea_id || !disponibilidad_id) {
      throw new Error('Datos incompletos para registrar asignación');
    }
    await pool.query(
      'SELECT registrar_asignacion($1, $2, $3)',
      [investigador_id, linea_id, disponibilidad_id]
    );
  }
}

export default Investigador;