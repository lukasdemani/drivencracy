import { ObjectId } from "mongodb";
import db from "../db.js";

export async function postPool(req, res){
    const pool = req.body;

    try {
        const response = await db.collection("pools").insertOne({ ...pool });

        const poolCreated = await db.collection("pools").findOne({ _id: ObjectId(response.insertedId) })

        res.status(201).send(poolCreated);
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