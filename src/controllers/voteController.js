import dayjs from "dayjs";
import db from "../db.js";

export async function postVote(req, res) {
    const choiceId = req.params;

    const vote = {
        createdAt: dayjs(),
        choiceId: choiceId
    }

    try {
        await db.collection("votes").insertOne({ ...vote });

        res.sendStatus(201);
    } catch {
        return res.sendStatus(500);
    }
}

export async function getResult(req, res) {
    const poolId = req.params;

    try {
        const choices = await db.collection("choices").find({ id: poolId}).toArray();
        const votes = await db.collection("votes").find({}).toArray();

        const choicesId = choices.map((choice) => choice.id);
        const votesFiltered = votes.filter((vote) => choicesId.includes(vote.choiceId));
        const votesFilteredId = votesFiltered.map((vote) => vote.id);

        function getWinner(votesFilteredId){
            return votesFilteredId.sort((a,b) =>
                  votesFilteredId.filter(v => v===a).length
                - votesFilteredId.filter(v => v===b).length
            ).pop();
        }

        res.send(winner);
    } catch {
        return res.sendStatus(500);
    }
}