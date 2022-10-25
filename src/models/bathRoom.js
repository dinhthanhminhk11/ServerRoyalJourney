import mongoose from 'mongoose'

const bathSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  iconImage: {
    type: String,
  },
})

export default mongoose.model('bathrooms', bathSchema)
