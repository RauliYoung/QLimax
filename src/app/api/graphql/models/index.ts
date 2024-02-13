import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'All fields are required'],
  },
  email: {
    type: String,
    required: [true, 'All fields are required'],
  },

});

export default mongoose.models.UserModel ||
  mongoose.model('UserModel', userSchema);
