import pool from '../config/db.js';

class LineaInvestigacion {
  constructor({ id, nombre, area }) {
    this.id = id;
    this.nombre = nombre;
    this.area = area;
  }

  static async create(data) {
  const { nombre, area } = data;
  if (!nombre || !area) throw new Error('Datos incompletos para registrar línea');

  const result = await pool.query(
    'SELECT * FROM registrar_linea($1, $2)',
    [nombre, area]
  );

  return result.rows[0]; // 🔹 Devuelve id, nombre, area
}

  static async findAll() {
    const result = await pool.query('SELECT * FROM obtener_lineas()');
    return result.rows;
  }
}

export default LineaInvestigacion;