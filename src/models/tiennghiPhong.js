import mongoose from 'mongoose'

const TienNghiPhongSchema = mongoose.Schema({
  name: {
    type: String,
  },
  iconImage: {
    type: String,
  },
})

export default mongoose.model('tiennghiphong', TienNghiPhongSchema)