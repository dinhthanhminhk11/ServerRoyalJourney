import user from '../../models/user'
import product from '../../models/product'
import bookmark from '../../models/bookmark'
import e from 'express'

export const createBookmark = async (req, res) => {
    try {
        const dataBookmark = {
            idUser: req.body.idUser,
            idHouse: req.body.idHouse
        }
        const saveBookmark = await new bookmark(dataBookmark).save()
        res.status(200).json({
            message: true,
            data: saveBookmark
        })
    } catch (error) {
        res.status(401).json({
            messege: false
        })
    }
}

export const listProductById = async (req, res) => {
    try {
        const dataBookmark = await bookmark.find({
            'idUser': req.params.id
        })
        // dataBookmark.forEach(element => {
        //     dataProduct.push(element.idHouse)
        // });
        // const productNew = await product.find().where('_id').in(dataProduct);
        res.status(200).json({
            message: true,
            data: dataBookmark
        })
    } catch (error) {
        res.status(401).json({
            messege: false
        })
    }
}

export const deleteBookmark = async (req, res) => {
    try {
        const data = await bookmark.findOneAndDelete({
            'idUser': req.params.idUser,
            'idHouse': req.params.idHouse
        })
        res.status(200).json({
            message: true,
            data: data
        })
    } catch (error) {
        res.status(401).json({
            messege: false
        })
    }
}

export const getBookmarkByIdUserAndIdHouse = async (req, res) => {
    try {
        const dataBookmark = await bookmark.find({
            'idUser': req.params.idUser,
            'idHouse': req.params.idHouse
        })
        res.status(200).json({
            message: true,
            data: dataBookmark
        })
    } catch (error) {
        res.status(401).json({
            messege: false
        })
    }
}
