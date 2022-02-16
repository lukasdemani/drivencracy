import dayjs from "dayjs";
import choiceSchema from "../schemas/choiceSchema.js";

export async function validateChoiceSchema(req, res, next){
    const choice = req.body;

    const validation = choiceSchema.validate(choice);
    if (validation.error) {
        return res.sendStatus(422);
    }

    const choiceDb = await db.collection("choices").findOne({ title: choice.title });
    if (choiceDb) {
        return res.sendStatus(409);
    }
    
    const pool = await db.collenction("pools").findOne({ id: choice.poolId });
    if (!pool){
        return res.sendStatus(404);
    }
    const isExpired = dayjs(pool.expireAt).toNow()>0;
    if (isExpired) {
        return res.sendStatus(403)
    }

    next();
}
