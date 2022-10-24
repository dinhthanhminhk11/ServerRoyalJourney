import product from "../../models/product"
export const deleteProduct = async (req,res)=>{
    try {
        const data = await product.findOneAndDelete({_id:req.params.id})
        res.json(data)
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}