import Investigador from '../models/Investigador.js';

// Crear investigador
const crearInvestigador = async (req, res) => {
  try {
    const nuevoInvestigador = await Investigador.create(req.body);
    // 🔹 Devuelve el objeto con el id
    res.status(201).json(nuevoInvestigador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener investigadores
const obtenerInvestigadores = async (req, res) => {
  try {
    const investigadores = await Investigador.getAll();
    res.json(investigadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Registrar disponibilidad
const registrarDisponibilidad = async (req, res) => {
  try {
    const disponibilidad = await Investigador.registrarDisponibilidad(req.body);
    res.status(201).json(disponibilidad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Registrar asignación
const registrarAsignacion = async (req, res) => {
  try {
    await Investigador.registrarAsignacion(req.body);
    res.status(201).json({ message: 'Asignación registrada correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  crearInvestigador,
  obtenerInvestigadores,
  registrarDisponibilidad,
  registrarAsignacion
};