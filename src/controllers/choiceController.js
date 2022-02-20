import db from "../db.js";
import { ObjectId } from "mongodb";

export async function postChoice(req, res) {
    const choice = req.body;

    try {
        const response = await db.collection("choices").insertOne({ ...choice });

        const choiceCreated = await db.collection("choices").findOne({ _id: ObjectId(response.insertedId) })

        res.status(201).send(choiceCreated);
    } catch {
        return res.sendStatus(500);
    }
}

export async function getChoice(req, res) {
    const { id } = req.params;

    try {
        const choices = await db.collection("choices").find({ poolId: id }).toArray()

        res.status(201).send(choices);
    } catch {
        return res.sendStatus(500);
    }
}