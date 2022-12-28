import mongoose, { Schema } from 'mongoose'

let date_now = new Date();
let time = date_now.getHours()+":"+date_now.getMinutes()
const PhongSchema = mongoose.Schema(
    {
        idHotel: {
            type: Schema.Types.ObjectId,
            ref: 'Hotel',
        },
        name:{
            type:String
        },
        images: [],
        price: {
            type: Number
        },
        dienTich:{
            type:String
        },
        timeDat:{
            type: String,
            default: time
        },
        timeTra:{
            type: String,
            default: ""
        },
        TienNghiPhong: Array,
        SoGiuong:{
            type: Number
        },
        SoPhong: {
            type: Number
        },
        mota:{
            type: String
        }

    }
)

export default mongoose.model("Phong" , PhongSchema)