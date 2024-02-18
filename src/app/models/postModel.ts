import mongoose from 'mongoose';
import slugify from 'slugify';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [
    {
      tag: String,
      color: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    unique: true,
  },
  timeToRead: {
    type: Number,
    default: 0,
  },
});

postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    const idString = this._id.toString();
    const shortId = idString.slice(-2);
    this.slug = slugify(`${this.title}-QlimaxAtPeak-${shortId}`, {lower: true, strict: true});
  }
  next();
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
