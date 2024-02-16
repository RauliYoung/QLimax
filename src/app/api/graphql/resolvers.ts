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
    updateUser: async (_: any, {input}: any, context: any) => {
      try {
        return await context.dataSources.users.updateUser({input});
      } catch (error) {
        throw new Error('Failed to update user');
      }
    },
    deleteUser: async (_: any, {id}: any, context: any) => {
      try {
        return await context.dataSources.users.deleteUser({id});
      } catch (error) {
        throw new Error('Failed to delete user');
      }
    },
  },
};

export default resolvers;
