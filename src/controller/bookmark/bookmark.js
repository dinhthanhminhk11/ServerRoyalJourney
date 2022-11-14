import user from '../../models/user'
import product from '../../models/product'
import bookmark from '../../models/bookmark'

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