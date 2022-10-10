import category from "../../models/category";

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