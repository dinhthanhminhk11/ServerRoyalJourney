import mongoose, { Schema } from 'mongoose'
const HotelSchema = mongoose.Schema(
    {
        idUser: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        name:{
            type:String
        },
        images: [],
        dienTich:{
            type:String
        },
        tinh:{
            type: String
        },
        huyen:{
            type: String
        },
        xa:{
            type: String
        },
        sonha:{
            type: String
        },
        timeDat:{
            type: String
        },
        timeTra:{
            type: String
        },
        TienNghiKS: Array,

        longitude:{
            type:String
        },
        latitude:{
            type: String
        },
        TbSao: {
            type : Number,
            default: 5
        },
        mota:{
            type: String
        },
        yte: {
            type: Boolean
        }

    }
)

export default mongoose.model("Hotel" , HotelSchema)