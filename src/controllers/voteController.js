import { ObjectId } from "mongodb";
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

        function getWinner(votes){
            return votes.sort((a,b) =>
                  votes.filter(vote => vote===a).length
                - votes.filter(vote => vote===b).length
            ).pop();
        }

        const mostVotedId = getWinner(votesFilteredId);

        const numVotes = votesFiltered.filter((vote) => vote.choiceId === mostVotedId).length

        const mostVoted = choices.filter((choice) => choice._id.toString() === mostVotedId)

        const pool = await db.collection("pools").findOne({ _id: ObjectId(id) })


        const result = {
            title: mostVoted[0].title,
            votes: numVotes
        }

        res.send({ ...pool, result });
    } catch {
        return res.sendStatus(500);
    }
}