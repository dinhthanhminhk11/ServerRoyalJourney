import mongoose, { Schema } from 'mongoose'
const orderSchema = mongoose.Schema(
    {
      IdOder: {
        type: String,
      },
      IdHost: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      IdUser: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      IdPro: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      price: {
        type: String,
      },
      payDay: {
        type: Number,
      },
      cashMoney: {
        type: Boolean,
      },
      banking: {
        type: Boolean,
      },
      isBackingPercent: {
        type: Boolean
      },
      seem: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        default: 'Đang chờ',
      },
      startDate:{
        type: String
      },
      endDate: {
        type: String
      },
      person: {
        type: Number
      },
      phone:{
        type: String
      },
      reasonUser: {
        type: String,
        default : ""
      },
      reasonHost: {
        type: String,
        default : ""
      },
      pricePercent: {
        type: String
      },
      cancellationDate: {
        type: String,
        default: ""
      },
      isCancellationDate: {
        type: Boolean,
        default: false
      }

    },
    { timestamps: true }
  )
  
  export default mongoose.model('order', orderSchema)