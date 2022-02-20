import db from "../db.js";

export async function validateChoiceParams(req, res, next){
    const { id } = req.params;

    const choice = await db.collection("choices").findOne({ poolId: id });
    if (!choice){
        return res.sendStatus(404);
    }

    next();
}
