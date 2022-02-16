import { Router } from "express";
import poolRouter from "./poolRouter.js";
import voteRouter from "./voteRouter.js";

const router = Router();

router.use(poolRouter);
router.use(voteRouter);

export default router;