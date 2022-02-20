import dayjs from "dayjs";
import choiceSchema from "../schemas/choiceSchema.js";
import db from "../db.js";
import { ObjectId } from "mongodb";

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
    
    const pool = await db.collection("pools").findOne({ _id: ObjectId(choice.poolId) });
    if (!pool){
        return res.sendStatus(404);
    }

    if (dayjs().diff(dayjs(pool.expireAt))>0) {
        return res.sendStatus(403)
    }

    next();
}
