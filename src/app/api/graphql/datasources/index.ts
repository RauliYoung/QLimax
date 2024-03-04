import {MongoDataSource} from 'apollo-datasource-mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ObjectId} from 'mongodb';
import UserModel from '@/app/models/userModel';
import PostModel from '@/app/models/postModel';
import crypto from 'crypto';

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
  timeToRead: number;
}
interface CommentDocument {
  _id: ObjectId;
  content: string;
  createdAt: Date;
  post: PostDocument;
  authorId: string;
}
interface NewComment {
  content: string;
  post: PostDocument;
  id: string;
  authorId: string;
}

export class Users extends MongoDataSource<UserDocument> {
  async getAllUsers() {
    try {
      return await UserModel.find();
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }
  async addBookmark(userId: string, postId: string) {
    try {
      const user = await UserModel.findById(userId);
      user.bookmarks.push(postId);
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Failed to add bookmark');
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
    console.log(input);
    try {
      const {id, password, email, isValidated} = input;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        input.password = hashedPassword;
      }
      if (isValidated) {
        input.isValidated = isValidated;
      }
      if (email) {
        input.email = email;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        {...input},
        {
          new: true,
        }
      );
      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }
  async signIn({email, password}: {email: string; password: string}) {
    try {
      const user = await UserModel.findOne({email});
      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET ?? '', {
        expiresIn: '4h',
      });

      return {token, id: user._id};
    } catch (error) {
      throw new Error('Failed to sign in');
    }
  }

  async deleteUser({id}: {id: string}): Promise<string> {
    console.log('ID');
    console.log(id);
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
  async getPostBySlug(slug: string) {
    try {
      return await PostModel.findOne({slug});
    } catch (error) {
      throw new Error('Failed to fetch post');
    }
  }

  async createPost({input}: any): Promise<PostDocument> {
    try {
      const words = input.content.split(' ').length;
      const timeToRead = Math.ceil(words / 200);
      const newPost = {
        ...input,
        isPublished: input.isPublished || false,
        timeToRead,
      };
      return await PostModel.create(newPost);
    } catch (error) {
      throw new Error('Failed to create post');
    }
  }

  async updatePost({id, input}: any) {
    try {
      const words = input.content.split(' ').length;
      const timeToRead = Math.ceil(words / 200);
      const updatedPostInput = {
        ...input,
        isPublished: input.isPublished || false,
        timeToRead,
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
  async createComment({postId, content, authorId}: any) {
    try {
      const post = await PostModel.findById(postId);
      const newComment: NewComment = {
        id: crypto.randomUUID(),
        content,
        post,
        authorId,
      };
      post.comments.push(newComment);
      await post.save();
      return newComment;
    } catch (error) {
      throw new Error('Failed to create comment');
    }
  }
  async likePost(postId: string) {
    try {
      const post = await PostModel.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }
      post.likes += 1;
      await post.save();
      return post;
    } catch (error) {
      throw new Error('Failed to like post');
    }
  }

  async updateComment({
    postId,
    commentId,
    content,
  }: any): Promise<CommentDocument> {
    try {
      const post = await PostModel.findById(postId);
      const comment = post.comments.id(commentId);
      comment.content = content;
      await post.save();
      return comment;
    } catch (error) {
      throw new Error('Failed to update comment');
    }
  }

  async deleteComment({postId, commentId}: any): Promise<string> {
    try {
      const post = await PostModel.findById(postId);
      post.comments.id(commentId).remove();
      await post.save();
      return 'Comment deleted successfully';
    } catch (error) {
      throw new Error('Failed to delete comment');
    }
  }
}
