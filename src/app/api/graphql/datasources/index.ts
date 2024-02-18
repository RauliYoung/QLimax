import {MongoDataSource} from 'apollo-datasource-mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ObjectId} from 'mongodb';
import UserModel from '@/app/models/userModel';
import PostModel from '@/app/models/postModel';
import slugify from 'slugify';

interface UserDocument {
  _id: ObjectId;
  username: string;
  password: string;
}
interface PostDocument {
  _id: ObjectId;
  title: string;
  content: string;
  tags: {tag: string; color: string}[];
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  slug: string;
}

export class Users extends MongoDataSource<UserDocument> {
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

      const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
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
export class Posts extends MongoDataSource<PostDocument> {
  async getAllPosts() {
    try {
      return await PostModel.find();
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  }

  async getPostById(id: string) {
    try {
      return await PostModel.findById(id);
    } catch (error) {
      throw new Error('Failed to fetch post');
    }
  }

  async createPost({input}: any): Promise<PostDocument> {
    try {
      const newPost = {
        ...input,
        isPublished: input.isPublished || false,
      };
      return await PostModel.create(newPost);
    } catch (error) {
      throw new Error('Failed to create post');
    }
  }
  async updatePost({id, input}: any) {
    try {
      const updatedPostInput = {
        ...input,
        isPublished: input.isPublished || false,
      };
      return await PostModel.findByIdAndUpdate(id, updatedPostInput, {
        new: true,
      });
    } catch (error) {
      throw new Error('Failed to update post');
    }
  }

  async deletePost({id}: {id: string}): Promise<string> {
    try {
      await PostModel.findByIdAndDelete(id);
      return 'Post deleted successfully';
    } catch (error) {
      throw new Error('Failed to delete post');
    }
  }
}
