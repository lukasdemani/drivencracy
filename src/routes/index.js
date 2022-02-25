import { Router } from "express";

const router = Router();

router.use(categoriesRouter);
router.use(clientsRouter);
router.use(rentalsRouter);
router.use(gamesRouter);

export default router;