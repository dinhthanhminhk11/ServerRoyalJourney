import category from "../../models/category";
import products from "./../../models/product"

export const getCategory = async (req,res)=>{
    try {
        const data = await category.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

export const findCategory = async (req,res)=>{
    try {
        const data = await category.find({_id: req.params.id})
        const product = await products.find({category:data}).populate({path: 'category',model:'Category',select:'name'}).select('-category')
        res.json({
            data,
            product
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}


export const getNameCatogory = async (req,res)=>{
    try {
        const data = await category.findById({_id: req.params.id})
        res.status(200).json(data.name)
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}