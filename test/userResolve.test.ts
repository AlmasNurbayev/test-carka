import {generateToken, authResolve}  from '../src/graphQL/userResolve';

describe('userResolve test', () => {
    test('generate token', () => {
        expect(generateToken(999, 'test999', 'user')).toMatch('ey');
    });
    test('authResolve token', async () => {
        expect(await authResolve({ email: String(process.env.TEST_LOGIN), password: String(process.env.TEST_PASSWORD) })).toHaveProperty('token');
    });
    test('authResolve error', async () => {
        expect(await authResolve({ email: String(process.env.TEST_LOGIN) + '!?', password: String(process.env.TEST_PASSWORD) + '!?' })).toHaveProperty('error');
    });
});