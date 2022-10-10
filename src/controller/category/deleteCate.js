import category from "../../models/category";

export const deleteCategory = async (req,res)=>{
    try {
        const data = await category.findOneAndDelete({_id:req.params.id})
        res.json(data)
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}