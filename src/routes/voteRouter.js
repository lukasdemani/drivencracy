import { Router } from "express";
import { postVote, getResult } from "../controllers/voteController.js";
import { validateVote } from "../middleware/validateVote.js";

const voteRouter = Router();

voteRouter.post('/choice/:id/vote', validateVote, postVote);
voteRouter.get('/pool/:id/result', getResult);


export default voteRouter;