// models/Grupo.js
import pool from '../config/db.js';

class Grupo {
  static async obtenerGrupos(linea, disponibilidad) {
    const query = 'SELECT * FROM obtener_grupos($1, $2)';
    const values = [linea || null, disponibilidad || null];
    const { rows } = await pool.query(query, values);
    return rows;
  }
   static async obtenerGruposTotal() {
    const query = 'SELECT * FROM obtener_grupos()';
    const { rows } = await pool.query(query);
    return rows;
  }
}

export default Grupo;