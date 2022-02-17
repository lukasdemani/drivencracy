import db from "../db.js";

export async function postPool(req, res){
    const pool = req.body;

    try {
        await db.collection("pools").insertOne({ ...pool });

        res.status(201).send(pool);
    } catch {
        return res.sendStatus(500);
    }
}

export async function getPool(req, res) {
    try {
        const pools = await db.collection("pools").find({}).toArray();

        res.send({ pools })
    } catch {
        return res.sendStatus(500);
    }
}