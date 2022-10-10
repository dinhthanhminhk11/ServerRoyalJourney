import category from "../../models/category";

export const updateCategory = async (req,res)=>{
    try {
        const data = await category.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
        res.json(data)
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}