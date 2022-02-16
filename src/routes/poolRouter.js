import { Router } from "express";

const poolRouter = Router();

poolRouter.post('/pool', postPool);
poolRouter.get('/pool', getPool);
poolRouter.post('/choice', postChoice);
poolRouter.get('/pool/:id/choice', getChoice);

export default poolRouter;

