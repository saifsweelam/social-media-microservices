import User from './users.model';

describe('User Model', () => {
    const validEmail = 'valid_email@gmail.com';
    const validPassword = 'ValidPassw0rd';

    it("doesn't allow to create a user with invalid email", async () => {
        const user = new User({
            email: 'invalid_email',
            password: validPassword,
        });
        await expect(user.save()).rejects.toThrow();
    });

    it("doesn't allow to create a user with invalid password", async () => {
        const user = new User({
            email: validEmail,
            password: 'invalid_password',
        });
        await expect(user.save()).rejects.toThrow();
    });

    it('saves the valid user to the database successfully', async () => {
        const user = new User({ email: validEmail, password: validPassword });
        await expect(user.save()).resolves.toBe(user);
    });

    it("doesn't allow to create a user with duplicate email", async () => {
        const user = new User({ email: validEmail, password: validPassword });
        await expect(user.save()).resolves.toBe(user);
        const duplicateUser = new User({
            email: validEmail,
            password: validPassword,
        });
        await expect(duplicateUser.save()).rejects.toThrow();
    });
});
