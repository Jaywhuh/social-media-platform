import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

postSchema.index({ author: 1 });

const Post = mongoose.model('Post', postSchema);

export default Post;