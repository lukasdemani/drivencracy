import dayjs from "dayjs";
import db from "../db.js";

export async function postVote(req, res) {
    const { id } = req.params;

    const vote = {
        createdAt: dayjs(),
        choiceId: id
    }

    try {
        await db.collection("votes").insertOne({ ...vote });

        res.sendStatus(201);
    } catch {
        return res.sendStatus(500);
    }
}

export async function getResult(req, res) {
    const { id } = req.params;

    try {
        const choices = await db.collection("choices").find({ poolId: id }).toArray();
        const votes = await db.collection("votes").find({}).toArray();

        const choicesId = choices.map((choice) => choice._id.toString());
        const votesFiltered = votes.filter((vote) => choicesId.includes(vote.choiceId));
        const votesFilteredId = votesFiltered.map((vote) => vote.choiceId);
        console.log(votesFilteredId)

        function getWinner(votesFilteredId){
            return votesFilteredId.sort((a,b) =>
                  votesFilteredId.filter(v => v===a).length
                - votesFilteredId.filter(v => v===b).length
            ).pop();
        }

        res.send(getWinner(votesFilteredId));
    } catch {
        return res.sendStatus(500);
    }
}