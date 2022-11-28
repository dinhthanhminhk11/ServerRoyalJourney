import mongoose, { Schema } from 'mongoose'
const NotiSchema = mongoose.Schema(
    {
        idOder: {
            type: String
          },
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

        imageHoust: {
            type: String
        },
        date: {
            type: String
        },
        time : {
            type: String
        },
        isSeem: {
            type: Boolean,
            default: true
        }
    }
)

export default mongoose.model('noti', NotiSchema)