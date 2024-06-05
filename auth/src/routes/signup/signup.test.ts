import supertest from 'supertest';
import app from '../../app';

describe('POST /api/auth/signup', () => {
    it('responds with a 400 status code in case of invalid email', async () => {
        await supertest(app).post('/api/auth/signup').send({}).expect(400);
        await supertest(app)
            .post('/api/auth/signup')
            .send({ email: 'invalid_email' })
            .expect(400);
    });
});
