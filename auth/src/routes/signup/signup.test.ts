import supertest from 'supertest';
import app from '../../app';

describe('POST /api/auth/signup', () => {
    describe('Email validation', () => {
        const validPassword = 'validPassw0rd';

        it('responds with a 400 status code in case of invalid email', async () => {
            await supertest(app)
                .post('/api/auth/signup')
                .send({ password: validPassword })
                .expect(400);
            await supertest(app)
                .post('/api/auth/signup')
                .send({ email: 'invalid_email', password: validPassword })
                .expect(400);
        });

        it('responds with a 200 status code in case of valid email', async () => {
            await supertest(app)
                .post('/api/auth/signup')
                .send({ email: 'validEmail@mail.com', password: validPassword })
                .expect(200);
        });
    });

    describe('Password validation', () => {
        const validEmail = 'validEmail@mail.com';

        it('responds with a 400 status code in case of no password', async () => {
            await supertest(app)
                .post('/api/auth/signup')
                .send({ email: validEmail })
                .expect(400);
        });

        it('responds with a 400 status code in case of too short password', async () => {
            await supertest(app)
                .post('/api/auth/signup')
                .send({ email: validEmail, password: 'Sh0rt' })
                .expect(400);
        });

        it('responds with a 400 status code in case of too long password', async () => {
            await supertest(app)
                .post('/api/auth/signup')
                .send({
                    email: validEmail,
                    password:
                        'wayTooLongPasswordThatIWontBeEvenAbleToRemember22',
                })
                .expect(400);
        });

        it('responds with a 400 status code in case of no uppercase characters in password', async () => {
            await supertest(app)
                .post('/api/auth/signup')
                .send({ email: validEmail, password: 'longpassword1' })
                .expect(400);
        });

        it('responds with a 400 status code in case of no lowercase characters in password', async () => {
            await supertest(app)
                .post('/api/auth/signup')
                .send({ email: validEmail, password: 'ALPHA2020' })
                .expect(400);
        });

        it('responds with a 400 status code in case of no numbers in password', async () => {
            await supertest(app)
                .post('/api/auth/signup')
                .send({ email: validEmail, password: 'longPassword' })
                .expect(400);
        });

        it('responds with a 200 status code in case of valid password', async () => {
            await supertest(app)
                .post('/api/auth/signup')
                .send({ email: validEmail, password: 'ValidPassw0rd' })
                .expect(200);
        });
    });
});
