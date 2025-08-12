// controllers/grupoController.js
import Grupo from '../models/Grupo.js';

const obtenerGrupos = async (req, res) => {
  try {
    const { linea, disponibilidad } = req.query; // llegan como string
    const grupos = await Grupo.obtenerGrupos(linea, disponibilidad);
    res.json(grupos);
  } catch (error) {
    console.error('Error obteniendo grupos:', error);
    res.status(500).json({ error: 'Error obteniendo grupos' });
  }
};

const obtenerGruposTotal = async (req, res) => {
  try {
    const grupos = await Grupo.obtenerGrupos();
    res.json(grupos);
  } catch (error) {
    console.error('Error obteniendo grupos:', error);
    res.status(500).json({ error: 'Error obteniendo grupos' });
  }
};
export { obtenerGrupos };