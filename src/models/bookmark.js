import mongoose, { Schema } from 'mongoose'
const bookmarkSchema = mongoose.Schema(
    {
        idUser: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        idHotel:{
            type: Schema.Types.ObjectId,
            ref: 'Hotel',
        },
        isCheck: {
            type: Boolean,
            default: true
        }
    }
)

export default mongoose.model("bookmark" , bookmarkSchema)