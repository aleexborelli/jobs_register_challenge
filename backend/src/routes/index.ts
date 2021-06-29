import { Router } from 'express';
import jobRoutes from './job';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) => response.json({ message: 'Hello Code83' }));

routes.use(`${prefixRoutes}/jobs`, jobRoutes);

export default routes;
