import mongoose from 'mongoose'

const TienNghiKsSchema = mongoose.Schema({
  name: {
    type: String,
  },
  iconImage: {
    type: String,
  },
})

export default mongoose.model('tiennghiks', TienNghiKsSchema)