const resolvers = {
  Query: {
    users: async (
      _: any,
      __: any,
      context: {dataSources: {users: {getAllUsers: () => any}}},
    ) => {
      try {
        return await context.dataSources.users.getAllUsers();
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },
    user: async (
      _: any,
      {id}: {id: string},
      context: {dataSources: {users: {getUser: (id: string) => any}}},
    ) => {
      try {
        return await context.dataSources.users.getUser(id);
      } catch (error) {
        throw new Error('Failed to fetch user');
      }
    },

    posts: async (
      _: any,
      __: any,
      context: {dataSources: {posts: {getAllPosts: () => any}}},
    ) => {
      try {
        return await context.dataSources.posts.getAllPosts();
      } catch (error) {
        throw new Error('Failed to fetch posts');
      }
    },
    postBySlug: async (
      _: any,
      {slug}: {slug: string},
      context: {dataSources: {posts: {getPostBySlug: (slug: string) => any}}},
    ) => {
      try {
        return await context.dataSources.posts.getPostBySlug(slug);
      } catch (error) {
        throw new Error('Failed to fetch post');
      }
    },

    post: async (
      _: any,
      {id}: {id: string},
      context: {dataSources: {posts: {getPostById: (id: string) => any}}},
    ) => {
      try {
        return await context.dataSources.posts.getPostById(id);
      } catch (error) {
        throw new Error('Failed to fetch post');
      }
    },
  },

  Mutation: {
    createUser: async (_: any, {input}: any, context: any) => {
      try {
        const newUser = await context.dataSources.users.createUser({
          input,
        });
        return newUser;
      } catch (error) {
        throw new Error('Failed to create user');
      }
    },
    signIn: async (_: any, {email, password}: any, context: any) => {
      try {
        return await context.dataSources.users.signIn({email, password});
      } catch (error) {
        throw new Error('Failed to sign in');
      }
    },
    createComment: async (_: any, {input}: any, context: any) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      try {
        const newComment = await context.dataSources.posts.createComment({
          ...input,
        });
        return newComment;
      } catch (error) {
        throw new Error('Failed to create comment');
      }
    },
    updateComment: async (_: any, {input}: any, context: any) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      try {
        const updatedComment = await context.dataSources.posts.updateComment({
          ...input,
        });
        return updatedComment;
      } catch (error) {
        throw new Error('Failed to update comment');
      }
    },

    deleteComment: async (_: any, {id}: any, context: any) => {
      try {
        if (!context.user) {
          throw new Error('Unauthorized');
        }
        return await context.dataSources.posts.deleteComment({id});
      } catch (error) {
        throw new Error('Failed to delete comment');
      }
    },

    updateUser: async (_: any, {input}: any, context: any) => {
      try {
        return await context.dataSources.users.updateUser({input});
      } catch (error) {
        throw new Error('Failed to update user');
      }
    },
    confirmPassword: async (_: any, {id, password}: any, context: any) => {
      try {
        return await context.dataSources.users.confirmPassword({id, password});
      } catch (error) {
        throw new Error('Failed to confirm password');
      }
    },
    deleteUser: async (_: any, {id}: any, context: any) => {
      try {
        return await context.dataSources.users.deleteUser({id});
      } catch (error) {
        throw new Error('Failed to delete user');
      }
    },
    createPost: async (_: any, {input}: any, context: any) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      try {
        const newPostInput = {
          ...input,
          isPublished: input.isPublished || false,
        };
        const newPost = await context.dataSources.posts.createPost({
          input: newPostInput,
        });
        return newPost;
      } catch (error) {
        throw new Error('Failed to create post');
      }
    },
    likePost: async (_: any, {postId}: {postId: string}, context: any) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      try {
        const post = await context.dataSources.posts.likePost(postId);
        return post;
      } catch (error) {
        throw new Error('Failed to like post');
      }
    },

    addBookmark: async (
      _: any,
      {userId, postId}: {userId: string; postId: string},
      context: any,
    ) => {
      try {
        const user = await context.dataSources.users.addBookmark(
          userId,
          postId,
        );
        return user;
      } catch (error) {
        throw new Error('Failed to add bookmark');
      }
    },

    updatePost: async (_: any, {id, input}: any, context: any) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      try {
        const updatePostInput = {
          ...input,
          isPublished: input.isPublished || false,
        };
        return await context.dataSources.posts.updatePost({
          id,
          input: updatePostInput,
        });
      } catch (error) {
        throw new Error('Failed to update post');
      }
    },

    deletePost: async (_: any, {id}: any, context: any) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      try {
        return await context.dataSources.posts.deletePost({id});
      } catch (error) {
        throw new Error('Failed to delete post');
      }
    },
  },
};

export default resolvers;
