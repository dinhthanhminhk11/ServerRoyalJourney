import mongoose from 'mongoose'

const sleepSchema = mongoose.Schema({
  name: {
    type: String,
  }
})

export default mongoose.model('bedRoom', sleepSchema)
