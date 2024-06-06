import supertest from 'supertest';
import app from '../../app';
import { SIGN_UP_ROUTE } from './signup.route';

describe(`POST ${SIGN_UP_ROUTE}`, () => {
    const validEmail = 'validEmail@mail.com';
    const validPassword = 'validPassw0rd';

    describe('Request Method Validation', () => {
        it('responds with a 405 status code if the request method is not POST', async () => {
            await supertest(app).get(SIGN_UP_ROUTE).expect(405);

            await supertest(app).put(SIGN_UP_ROUTE).expect(405);

            await supertest(app).patch(SIGN_UP_ROUTE).expect(405);

            await supertest(app).delete(SIGN_UP_ROUTE).expect(405);
        });

        it('responds with a 200 status code if the request method is POST', async () => {
            await supertest(app)
                .post(SIGN_UP_ROUTE)
                .send({ email: validEmail, password: validPassword })
                .expect(200);
        });

        it('responds with a 200 status code and allow header set to POST if the request method is OPTIONS', async () => {
            const response = await supertest(app)
                .options(SIGN_UP_ROUTE)
                .expect(200);
            expect(response.headers.allow).toContain('POST');
            expect(response.headers['access-control-allow-methods']).toContain(
                'POST',
            );
        });
    });

    describe('Email validation', () => {
        it('responds with a 400 status code in case of invalid email', async () => {
            await supertest(app)
                .post(SIGN_UP_ROUTE)
                .send({ password: validPassword })
                .expect(400);

            await supertest(app)
                .post(SIGN_UP_ROUTE)
                .send({ email: 'invalid_email', password: validPassword })
                .expect(400);
        });

        it('responds with a 200 status code in case of valid email', async () => {
            await supertest(app)
                .post(SIGN_UP_ROUTE)
                .send({ email: 'validEmail@mail.com', password: validPassword })
                .expect(200);
        });
    });

    describe('Password validation', () => {
        it('responds with a 400 status code in case of no password', async () => {
            await supertest(app)
                .post(SIGN_UP_ROUTE)
                .send({ email: validEmail })
                .expect(400);
        });

        it('responds with a 400 status code in case of too short password', async () => {
            await supertest(app)
                .post(SIGN_UP_ROUTE)
                .send({ email: validEmail, password: 'Sh0rt' })
                .expect(400);
        });

        it('responds with a 400 status code in case of too long password', async () => {
            await supertest(app)
                .post(SIGN_UP_ROUTE)
                .send({
                    email: validEmail,
                    password:
                        'wayTooLongPasswordThatIWontBeEvenAbleToRemember22',
                })
                .expect(400);
        });

        it('responds with a 400 status code in case of no uppercase characters in password', async () => {
            await supertest(app)
                .post(SIGN_UP_ROUTE)
                .send({ email: validEmail, password: 'longpassword1' })
                .expect(400);
        });

        it('responds with a 400 status code in case of no lowercase characters in password', async () => {
            await supertest(app)
                .post(SIGN_UP_ROUTE)
                .send({ email: validEmail, password: 'ALPHA2020' })
                .expect(400);
        });

        it('responds with a 400 status code in case of no numbers in password', async () => {
            await supertest(app)
                .post(SIGN_UP_ROUTE)
                .send({ email: validEmail, password: 'longPassword' })
                .expect(400);
        });

        it('responds with a 200 status code in case of valid password', async () => {
            await supertest(app)
                .post(SIGN_UP_ROUTE)
                .send({ email: validEmail, password: 'ValidPassw0rd' })
                .expect(200);
        });
    });
});
