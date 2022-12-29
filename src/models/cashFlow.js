import mongoose, { Schema } from 'mongoose'
const cashFolw = mongoose.Schema(
    {
        idUser: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        title: {
            type: String
        },
        content: {
            type: String
        },
        dateTime: {
            type: String
        },
        price:{
            type: String
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

export default mongoose.model('cashFolw', cashFolw)