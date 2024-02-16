import { MongoDataSource } from 'apollo-datasource-mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import UserModel from '@/app/models/userModel';

interface UserDocument {
  _id: ObjectId;
  username: string;
  password: string;
}

export default class Users extends MongoDataSource<UserDocument> {
  async getAllUsers() {
    try {
      return await UserModel.find();
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  async createUser({input}: any): Promise<UserDocument> {
    try {
      const hashedPassword = await bcrypt.hash(input.password, 12);
      const newUser = await UserModel.create({
        ...input,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async updateUser({input}: any) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        input.id,
        {...input},
        {
          new: true,
        },
      );
      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }
  async signIn({email, password}: {email: string; password: string}) {
    try {
      const user = await UserModel.findOne({email}).select('+password').exec();
      if (!user) {
        throw new Error('Invalid credentials');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }
      const jwtSecret = process.env.JWT_SECRET;

      const token = jwt.sign({userId: user._id}, jwtSecret, {
        expiresIn: '4h',
      });

      return token;
    } catch (error) {
      throw new Error('Failed to sign in');
    }
  }

  async deleteUser({id}: {id: string}): Promise<string> {
    try {
      await UserModel.findByIdAndDelete(id);
      return 'User deleted successfully';
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}
