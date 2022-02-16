export async function validateVote(req, res, next){
    const choiceId = req.params;
    
    const choice = await db.collenction("choices").findOne({ id: choiceId });
    if (!choiceId) {
        return res.sendStatus(404);
    }

    const pool = await db.collenction("pools").findOne({ id: choice.poolId });
    const isExpired = dayjs(pool.expireAt).toNow()>0;
    if (isExpired) {
        return res.sendStatus(403)
    }

    next();
}