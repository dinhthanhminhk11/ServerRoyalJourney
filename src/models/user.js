import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
    // minlength: 9,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  address: {
    type: String,
  },
  idcard: {
    type: String,
  },
  image: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
  otp: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  otpResetPass: {
    type: String,
    required: true,
  } ,
  countBooking: {
    type: Number,
    default: 0,
  },
  tokenDevice: {
    type: String
  }
})
export default mongoose.model('user', userSchema)
