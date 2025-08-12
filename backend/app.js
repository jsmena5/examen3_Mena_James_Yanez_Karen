import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import investigadorRoutes from './routes/investigadorRoutes.js';
import lineaInvestigacionRoutes from './routes/lineaInvestigacionRoutes.js';
import grupoRoutes from './routes/grupoRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/investigadores', investigadorRoutes);
app.use('/api/lineas', lineaInvestigacionRoutes);
app.use('/api/grupos', grupoRoutes);



export default app;