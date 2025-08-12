import express from 'express';
import { 
  crearInvestigador, 
  obtenerInvestigadores, 
  registrarDisponibilidad, 
  registrarAsignacion 
} from '../controllers/investigadorController.js';

const router = express.Router();

router.post('/', crearInvestigador);
router.get('/', obtenerInvestigadores);

// Rutas nuevas:
router.post('/disponibilidad', registrarDisponibilidad);
router.post('/asignaciones', registrarAsignacion);

export default router;