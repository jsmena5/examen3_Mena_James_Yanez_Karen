import express from 'express';
import { crearLinea, obtenerLineas } from '../controllers/lineaController.js';

const router = express.Router();

router.post('/', crearLinea);
router.get('/', obtenerLineas);

export default router;