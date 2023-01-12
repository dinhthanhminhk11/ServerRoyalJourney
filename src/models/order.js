import mongoose, { Schema } from 'mongoose'
const orderSchema = mongoose.Schema(
    {
      idOrder: {
        type: String,
      },
      idHost: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      idUser: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      idHotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
      },
      idRoom: {
        type: Schema.Types.ObjectId,
        ref: 'Phong',
      },
      startDate:{
        type: String
      },
      endDate: {
        type: String
      },
      payDay: {
        type: Number,
      },
      countRoom: {
        type : Number
      },
      numberGuests :{
        type: String
      },
      phone:{
        type: String
      },
      specialRequirements: {
        type: String
      },
      priceAll: {
        type: Number,
      },
      priceAdmin: {
        type: Number,
      },
      priceEnterprise: {
        type: Number,
      },
      cashMoney: {
        type: Boolean,
      },
      banking: {
        type: Boolean,
      },
      seem: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        default: 'Đang chờ',
      },
     
      reasonUser: {
        type: String,
        default : ""
      },
      reasonHost: {
        type: String,
        default : ""
      },
      cancellationDate: {
        type: String,
      },
      timeCancellation: {
        type: String,
      },
      isCancellationDate: {
        type: Boolean,
        default: false
      },
      isSuccess: {
        type: Boolean,
        default: false
      },
      checkedOut: {
        type: Boolean,
        default: false
      },
      dateCreate: {
        type: String,
      },
      timeCreate: {
        type: String,
      }
    }
  )
  
  export default mongoose.model('order', orderSchema)