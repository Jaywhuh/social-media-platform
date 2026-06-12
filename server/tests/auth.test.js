import request from 'supertest';
import app from '../app.js';

const validUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123',
};

describe('POST /api/auth/register', () => {

  it('registers a new user and returns 201 with a token and user object', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(validUser);

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(validUser.email);
    expect(res.body.user.username).toBe(validUser.username);
    expect(res.body.user.password).toBeUndefined();
  });

  it('returns 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('returns 400 when username is shorter than 3 characters', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...validUser, username: 'ab' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/3 characters/i);
  });

  it('returns 400 when email format is invalid', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...validUser, email: 'notanemail' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/valid email/i);
  });

  it('returns 400 when password is shorter than 6 characters', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...validUser, password: 'abc' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/6 characters/i);
  });

  it('returns 409 when the email is already registered', async () => {
    await request(app).post('/api/auth/register').send(validUser);

    const res = await request(app)
      .post('/api/auth/register')
      .send(validUser);

    expect(res.status).toBe(409);
    expect(res.body.message).toBeDefined();
  });

});

describe('POST /api/auth/login', () => {

  beforeEach(async () => {
    await request(app).post('/api/auth/register').send(validUser);
  });

  it('logs in with correct credentials and returns 200 with a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: validUser.email, password: validUser.password });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(validUser.email);
  });

  it('returns 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('returns 401 when the password is wrong', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: validUser.email, password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/invalid email or password/i);
  });

  it('returns 401 when the email is not registered', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nobody@example.com', password: validUser.password });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/invalid email or password/i);
  });

  it('returns 400 when the email format is invalid', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'notanemail', password: validUser.password });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/valid email/i);
  });

});