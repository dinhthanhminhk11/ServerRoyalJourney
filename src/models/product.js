import mongoose, { ObjectId, Schema } from 'mongoose'

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [],
    price: {
      type: Number,
    },
    supplement: Array,
    nameLocation: {
      type: String,
    },
    location: {
      type: {
        type: String,
        required: true,
      },
      coordinates: [],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    legal: {
      type: String,
    },
    content: {
      type: String,
    },
    yte: {
      type: Boolean,
    },
    bathrooms: Array,
    limitPerson: Number,
    sleepingPlaces: Array,
    opening: String,
    ending: String,
  },
  { timestamps: true }
)
productSchema.index({ location: '2dsphere' })
export default mongoose.model('Product', productSchema)
