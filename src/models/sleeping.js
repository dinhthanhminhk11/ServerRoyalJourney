import mongoose from 'mongoose'

const sleepSchema = mongoose.Schema({
  bed: {
    type: String,
  },
  bedroom: {
    type: String,
  },
  iconImage: {
    type: String,
  },
})

export default mongoose.model('sleeping_beds', sleepSchema)
