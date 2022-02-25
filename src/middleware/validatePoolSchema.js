import poolSchema from "../schemas/poolSchema.js";
import dayjs from "dayjs";
import db from "../db.js";

export async function validatePoolSchema(req, res, next){
    const pool = req.body;

    const validation = poolSchema.validate(pool);
    if (validation.error) {
        return res.sendStatus(422);
    }

    const poolDb = await db.collection("pools").findOne({ title: pool.title });
    if (poolDb) {
        return res.sendStatus(409);
    }

    if (!pool.expireAt){
        pool.expireAt = dayjs().add(30, 'day').format('YYYY-MM-DD hh:mm');
    }

    next();
}