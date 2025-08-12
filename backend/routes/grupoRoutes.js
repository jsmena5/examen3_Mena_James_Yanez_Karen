// routes/grupoRoutes.js
import express from 'express';
import { obtenerGrupos } from '../controllers/grupoController.js';

const router = express.Router();

router.get('/', obtenerGrupos);

export default router;
