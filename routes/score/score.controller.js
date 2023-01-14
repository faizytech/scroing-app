var express = require('express');
const { scoreDTOValidator, addScoreDTO } = require('../../validators/score.validator');
const { getScores, addScore, updateScore, deleteScore } = require('./score.service');
var router = express.Router();

/* GET score page. */
router.get('/:gameId', async function(req, res, next) {

  const {gameId} = req.params;
  const scores = await getScores(gameId);
  res.json({
    data: scores
  })
});

/* Post score. */
router.post('/', scoreDTOValidator(addScoreDTO), async function(req, res, next) {
    const {gameId, userId, score} = req.body;
    try{
        const savedScore = await addScore(gameId,userId,score);
        res.json({
        data:savedScore
        })
    } catch(err){
        next(err);
    }
});

/* Put score. */
router.put('/:gameId', async function(req, res, next) {
    const {gameId} = req.params;
    const {userId, score} = req.body;
    try{
        const updatedScore = await updateScore(gameId,userId,score);
        if(updatedScore == null){
            res.status(404).json({
                error:"Score not found"
            });
        }
        res.json({
            data:updatedScore
        });
    } catch(err){
        next(err);
    }
});

router.delete('/:gameId', async function(req, res, next) {
    const {gameId} = req.params;
    const {userId} =  req.body;
    try{
        const deletedRecord = await deleteScore(gameId,userId);
        if(deletedRecord == null){
            res.status(404).json({
                error:"user not found"
            });
        }
        res.json({
            data: deletedRecord
        })
    } catch(err){
        next(err)
    }
});


module.exports = router;
