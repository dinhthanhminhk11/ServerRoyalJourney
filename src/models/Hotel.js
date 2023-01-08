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
        giaDaoDong: {
            type:String
        },
        TienNghiKS: Array,

        // longitude:{
        //     type:String
        // },
        // latitude:{
        //     type: String
        // },
        location: {
            type: {
                type: String,
                required: true,
            },
            coordinates: [],
        },
        TbSao: {
            type : Number,
            default: 5
        },
        imageConfirm: [],
        mota:{
            type: String
        },
        chinhsach:{
           type: String
        },
        yte: {
            type: Boolean
        },
        treEm: {
            type:Number
        },
        chinhSachHuy: {
            type: Boolean
        },
        checkConfirm:{
            type: Boolean,
            default: false
        }

    }
)
HotelSchema.index({location: '2dsphere'})
export default mongoose.model("Hotel" , HotelSchema)