import mongoose, { Schema } from 'mongoose'
const bookmarkSchema = mongoose.Schema(
    {
        idUser: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        idHouse:{
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }
    }
)

export default mongoose.model("bookmark" , bookmarkSchema)