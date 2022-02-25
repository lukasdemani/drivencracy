import db from "../db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function validateVote(req, res, next){
    const { id } = req.params;
    
    const choice = await db.collection("choices").findOne({ _id: ObjectId(id) });
    if (!choice) {
        return res.sendStatus(404);
    }

    const pool = await db.collection("pools").findOne({ _id: ObjectId(choice.poolId) });

    if (dayjs().diff(dayjs(pool.expireAt))>0) {
        return res.sendStatus(403)
    }

    next();
}