import resolvers from '../src/app/api/graphql/resolvers';

describe('Resolvers', () => {
  const mockContext = {
    dataSources: {
      users: {
        getAllUsers: jest.fn(),
        createUser: jest.fn(),
        signIn: jest.fn(),
        updateUser: jest.fn(),
        deleteUser: jest.fn(),
      },
    },
  };

  test('fetch all users', async () => {
    mockContext.dataSources.users.getAllUsers.mockReturnValueOnce([
      { id: '1', name: 'Test User' },
    ]);
    const result = await resolvers.Query.users(null, null, mockContext);
    expect(result).toEqual([{ id: '1', name: 'Test User' }]);
    console.log(result);
  });

  test('create a user', async () => {
    const userInput = { name: 'Test User' };
    mockContext.dataSources.users.createUser.mockReturnValueOnce(userInput);
    const result = await resolvers.Mutation.createUser(
      null,
      { input: userInput },
      mockContext,
    );
    expect(result).toEqual(userInput);
    console.log(result);
  });

  test('sign in a user', async () => {
    const userData = { email: 'testmail@mail.com', password: 'password' };
    mockContext.dataSources.users.signIn.mockReturnValueOnce('token');
    const result = await resolvers.Mutation.signIn(
      null,
      { email: userData.email, password: userData.password },
      mockContext,
    );
    expect(result).toEqual('token');
    console.log(result);
  });

  test('update a user', async () => {
    const userInput = { id: '1', name: 'Test User' };
    mockContext.dataSources.users.updateUser.mockReturnValueOnce(userInput);
    const result = await resolvers.Mutation.updateUser(
      null,
      { input: userInput },
      mockContext,
    );
    expect(result).toEqual(userInput);
    console.log(result);
  });

  test('delete a user', async () => {
    const userInput = { id: '10', name: 'Test User2'};
    mockContext.dataSources.users.deleteUser.mockReturnValueOnce(userInput);
    const result = await resolvers.Mutation.deleteUser(
      null,
      { id: userInput.id },
      mockContext,
    );
    expect(result).toEqual(userInput);
    console.log(result);
  });
});
