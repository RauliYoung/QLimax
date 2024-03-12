import resolvers from '../src/app/api/graphql/resolvers';
import { mockDeep } from 'jest-mock-extended';

const mockUsersDataSource = mockDeep();
const mockPostsDataSource = mockDeep();

const mockContext = {
  dataSources: {
    users: mockUsersDataSource,
    posts: mockPostsDataSource,
  },
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe('User Resolvers', () => {
  describe('Query users', () => {
    it('should return a list of users', async () => {
      const mockUsers = [{ id: '1', name: 'Test User' }];
      mockUsersDataSource.getAllUsers.mockResolvedValue(mockUsers);

      const result = await resolvers.Query.users(null, {}, mockContext);

      expect(result).toEqual(mockUsers);
      expect(mockUsersDataSource.getAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when the database call fails', async () => {
      mockUsersDataSource.getAllUsers.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(
        resolvers.Query.users(null, {}, mockContext),
      ).rejects.toThrow('Failed to fetch users');
    });
  });

  describe('Mutation createUser', () => {
    const userInput = { name: 'New User' };

    it('should create a user successfully', async () => {
      mockUsersDataSource.createUser.mockResolvedValue({ id: '2', ...userInput });

      const result = await resolvers.Mutation.createUser(
        null,
        { input: userInput },
        mockContext,
      );

      expect(result).toEqual({ id: '2', ...userInput });
      expect(mockUsersDataSource.createUser).toHaveBeenCalledWith({
        input: userInput,
      });
    });

    it('should throw an error if user creation fails', async () => {
      mockUsersDataSource.createUser.mockRejectedValue(
        new Error('Creation failed'),
      );

      await expect(
        resolvers.Mutation.createUser(null, { input: userInput }, mockContext),
      ).rejects.toThrow('Failed to create user');
    });
  });

  describe('User and Post Resolvers', () => {
    describe('Query user', () => {
      it('should return a user by ID', async () => {
        const mockUser = { id: '1', name: 'Test User' };
        mockUsersDataSource.getUser.mockResolvedValue(mockUser);

        const result = await resolvers.Query.user(null, { id: '1' }, mockContext);

        expect(result).toEqual(mockUser);
        expect(mockUsersDataSource.getUser).toHaveBeenCalledWith('1');
      });

      it('should throw an error when fetching user fails', async () => {
        mockUsersDataSource.getUser.mockRejectedValue(
          new Error('User fetch error'),
        );

        await expect(
          resolvers.Query.user(null, { id: '1' }, mockContext),
        ).rejects.toThrow('Failed to fetch user');
      });
    });

    describe('Query posts', () => {
      it('should return a list of posts', async () => {
        const mockPosts = [
          { id: '1', title: 'Post 1' },
          { id: '2', title: 'Post 2' },
        ];
        mockPostsDataSource.getAllPosts.mockResolvedValue(mockPosts);

        const result = await resolvers.Query.posts(null, {}, mockContext);

        expect(result).toEqual(mockPosts);
        expect(mockPostsDataSource.getAllPosts).toHaveBeenCalledTimes(1);
      });

      it('should throw an error when the posts fetch fails', async () => {
        mockPostsDataSource.getAllPosts.mockRejectedValue(
          new Error('Posts fetch error'),
        );

        await expect(
          resolvers.Query.posts(null, {}, mockContext),
        ).rejects.toThrow('Failed to fetch posts');
      });
    });

    describe('Mutation createPost', () => {
      const postInput = { title: 'New Post', content: 'This is a new post.', isPublished: true };

      it('should create a post successfully', async () => {
        const newPost = { id: '3', ...postInput };
        mockPostsDataSource.createPost.mockResolvedValue(newPost);

        const result = await resolvers.Mutation.createPost(
          null,
          { input: postInput },
          { ...mockContext, user: { id: '1' } }, 
        );

        expect(result).toEqual(newPost);
        expect(mockPostsDataSource.createPost).toHaveBeenCalledWith({
          input: postInput,
        });
      });

      it('should throw an error if unauthorized', async () => {
        await expect(
          resolvers.Mutation.createPost(null, { input: postInput }, mockContext), // no user in context
        ).rejects.toThrow('Unauthorized');
      });
    });

    describe('Mutation deleteUser', () => {
      it('should delete a user successfully', async () => {
        const userId = '1';
        mockUsersDataSource.deleteUser.mockResolvedValue(
          'User deleted successfully',
        );

        const result = await resolvers.Mutation.deleteUser(
          null,
          { id: userId },
          mockContext,
        );

        expect(result).toEqual('User deleted successfully');
        expect(mockUsersDataSource.deleteUser).toHaveBeenCalledWith({
          id: userId,
        });
      });

      it('should throw an error when user deletion fails', async () => {
        mockUsersDataSource.deleteUser.mockRejectedValue(
          new Error('Deletion failed'),
        );

        await expect(
          resolvers.Mutation.deleteUser(null, { id: '1' }, mockContext),
        ).rejects.toThrow('Failed to delete user');
      });
    });
  });
});
