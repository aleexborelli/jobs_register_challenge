import { Router } from 'express';
import JobController from '../controllers/JobController';

const jobRoutes = Router();
const jobController = new JobController();

jobRoutes.get('/', jobController.index);
jobRoutes.get('/:id', jobController.show);
jobRoutes.post('/', jobController.create);
jobRoutes.put('/:id', jobController.update);
jobRoutes.delete('/:id', jobController.delete);

export default jobRoutes;
