import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  isValidated: {
    type: Boolean,
    default: false,
  },
  bookmarks: [
    {
      type: String,
      ref: 'Post',
    },
  ],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
