import mongoose, { Schema } from 'mongoose'
const feedBackSchema = mongoose.Schema(
    {
        idUser: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        idHouse:{
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
        sao:{
            type: Number
        },
        time:{
            type: String
        },
        textUser:{type: String},
        textHost:{type: String}

    }
)

export default mongoose.model("feedback" , feedBackSchema)