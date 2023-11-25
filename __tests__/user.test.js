import { faker } from '@faker-js/faker';
const { signup, login } = require('../src/controllers/user.controller');

describe('Signup Function', () => {
    test('it should create a new user with valid data', async () => {
        const mockUserData = {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            usertype: 'guest'
        };

        const req = {
            body: mockUserData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const next = jest.fn();

        await signup(req, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User created successfully',
            data: expect.any(Object)
        });
    });

    // Add more tests for invalid data, user already exists, etc.
});

describe('Login Function', () => {
    test('it should generate a token for valid login credentials', async () => {
        // Assume you have a user in your database with these credentials
        const existingUser = {
            email: 'test@example.com',
            password: 'testPassword'
        };

        const req = {
            body: existingUser
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const next = jest.fn();

        await login(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            token: expect.any(String)
        });
    });

    // Add more tests for invalid login credentials, user not found, etc.
});
