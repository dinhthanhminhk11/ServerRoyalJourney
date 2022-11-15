import feedBack from "../../models/feedBack";

export const addFeedBack = async (req, res) => {
    try {
        const dataFeedback = {
            idUser: req.body.idUser,
            idHouse: req.body.idHouse,
            sao: req.body.sao,
            time: req.body.time,
            textUser: req.body.textUser,
            textHost: req.body.textHost
        }
        const saveFeedback = await new feedBack(dataFeedback).save()
        res.status(200).json({
            data: saveFeedback
        })
    } catch (error) {
        res.status(401).json({
            error
        })
    }
}

export const listFeedBackId = async (req, res) => {
    try {
        const dataFeedback = await feedBack.find({idHouse: req.params.idHouse})
        res.status(200).json({
            data: dataFeedback
        })
    } catch (error) {
        res.status(401).json({
            error
        })

    }
}
export const updateFeedBack = async (req, res) => {
    try {
        const updateFeedback = await feedBack.updateOne({_id: req.params.id},
            {textHost:req.params.textHost});
        res.status(200).json({
            data: updateFeedback
        })
    } catch (error) {
        res.status(401).json({
            error
        })
    }
}