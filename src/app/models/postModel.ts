import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    require: true,
  },
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;

