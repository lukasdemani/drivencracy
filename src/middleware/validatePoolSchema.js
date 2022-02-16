import poolSchema from "../schemas/poolSchema.js";

export async function validatePoolSchema(req, res, next){
    const pool = req.body;

    const validation = poolSchema.validate(pool);
    if (validation.error) {
        return res.sendStatus(422);
    }

    if (!pool.expireAt){
        pool.expireAt = dayjs().add(30, 'day');
    }

    next();
}