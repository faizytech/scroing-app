const Score = require("./score.model");

const getScores = async gameId => await Score.find({gameId});

const addScore = async (gameId, userId, score) => {
    const newScore = new Score({
        gameId,
        userId,
        score
    })
    return await newScore.save();
}

const updateScore = async (gameId,userId,score) => {
   return await Score.findOneAndUpdate({
        gameId,
        userId
    },{
        score
    },
    {
        new:true
    }
    )
}

const deleteScore = async (gameId, userId) => {
    return await Score.findOneAndDelete({userId,gameId});
}

module.exports = {
    getScores,
    addScore,
    updateScore,
    deleteScore
}