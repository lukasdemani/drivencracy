import db from "../db.js";

export async function postChoice(req, res) {
    const choice = req.body;

    try {
        await db.collection("choices").insertOne({ ...choice });

        res.status(201).send(choice);
    } catch {
        return res.sendStatus(500);
    }
}

export async function getChoice(req, res) {
    const poolId = req.params;

    try {
        const choices = await db.collection("choices").find({ poolId }).toArray()

        res.status(201).send(choices);
    } catch {
        return res.sendStatus(500);
    }
}