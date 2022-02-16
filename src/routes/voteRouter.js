import { Router } from "express";

const voteRouter = Router();

voteRouter.post('/pool', postPool);
voteRouter.get('/pool', getPool);


export default voteRouter;