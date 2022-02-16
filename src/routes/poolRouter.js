import { Router } from "express";
import { validatePoolSchema } from "../middleware/validatePoolSchema.js";
import { postPool, getPool } from "../controllers/poolController.js";
import { postChoice, getChoice } from "../controllers/choiceController.js";
import { validateChoiceSchema } from "../middleware/validateChoiceSchema.js";

const poolRouter = Router();

poolRouter.post('/pool', validatePoolSchema, postPool);
poolRouter.get('/pool', getPool);
poolRouter.post('/choice', validateChoiceSchema, postChoice);
poolRouter.get('/pool/:id/choice', getChoice);

export default poolRouter;

