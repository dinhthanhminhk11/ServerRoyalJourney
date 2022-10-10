import category from "../../models/category";

export const addCategory = async (req,res)=>{
    try {
        const data = await category(req.body).save()
        res.json(data)
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}