import LineaInvestigacion from '../models/LineaInvestigacion.js';

const crearLinea = async (req, res) => {
  try {
    const nuevaLinea = await LineaInvestigacion.create(req.body);
    // 🔹 Devuelve el objeto con el id
    res.status(201).json(nuevaLinea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerLineas = async (req, res) => {
  try {
    const lineas = await LineaInvestigacion.findAll();
    res.status(200).json(lineas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { crearLinea, obtenerLineas };