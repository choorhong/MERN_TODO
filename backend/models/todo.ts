import mongoose from 'mongoose'

const Schema = mongoose.Schema

const taskSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Task', taskSchema)
