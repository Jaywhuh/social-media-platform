import request from 'supertest';
import app from '../app.js';

const validUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123',
};

const otherUser = {
  username: 'otheruser',
  email: 'other@example.com',
  password: 'password123',
};

async function loginAs(user) {
  const res = await request(app).post('/api/auth/register').send(user);
  return { token: res.body.token, userId: res.body.user.id };
}

describe('GET /api/posts', () => {

  it('returns 200 with an empty array when no posts exist', async () => {
    const res = await request(app).get('/api/posts');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns all posts after one is created', async () => {
    const { token } = await loginAs(validUser);

    await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Hello world' });

    const res = await request(app).get('/api/posts');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].content).toBe('Hello world');
    expect(res.body[0].author.username).toBe(validUser.username);
  });

});

describe('POST /api/posts', () => {

  it('creates a post and returns 201 with the post object', async () => {
    const { token } = await loginAs(validUser);

    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'My first post' });

    expect(res.status).toBe(201);
    expect(res.body.content).toBe('My first post');
    expect(res.body._id).toBeDefined();
  });

  it('returns 400 when content is missing', async () => {
    const { token } = await loginAs(validUser);

    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('returns 401 when no token is provided', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ content: 'This should fail' });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/no token/i);
  });

});

describe('PUT /api/posts/:id', () => {

  let token;
  let postId;

  beforeEach(async () => {
    const auth = await loginAs(validUser);
    token = auth.token;

    const postRes = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Original content' });

    postId = postRes.body._id;
  });

  it('updates a post and returns 200 with updated content', async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Updated content' });

    expect(res.status).toBe(200);
    expect(res.body.content).toBe('Updated content');
  });

  it('returns 401 when no token is provided', async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .send({ content: 'Updated content' });

    expect(res.status).toBe(401);
  });

  it('returns 400 when content is empty', async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: '' });

    expect(res.status).toBe(400);
  });

  it('returns 403 when a different user tries to update the post', async () => {
    const { token: otherToken } = await loginAs(otherUser);

    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ content: 'Hijacked content' });

    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/not authorized/i);
  });

  it('returns 404 when the post does not exist', async () => {
    const fakeId = '000000000000000000000000';

    const res = await request(app)
      .put(`/api/posts/${fakeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Does not matter' });

    expect(res.status).toBe(404);
  });

});

describe('DELETE /api/posts/:id', () => {

  let token;
  let postId;

  beforeEach(async () => {
    const auth = await loginAs(validUser);
    token = auth.token;

    const postRes = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Post to delete' });

    postId = postRes.body._id;
  });

  it('deletes a post and returns 200 with a success message', async () => {
    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);

    const fetchRes = await request(app).get(`/api/posts/${postId}`);
    expect(fetchRes.status).toBe(404);
  });

  it('returns 401 when no token is provided', async () => {
    const res = await request(app).delete(`/api/posts/${postId}`);

    expect(res.status).toBe(401);
  });

  it('returns 403 when a different user tries to delete the post', async () => {
    const { token: otherToken } = await loginAs(otherUser);

    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${otherToken}`);

    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/not authorized/i);
  });

  it('returns 404 when the post does not exist', async () => {
    const fakeId = '000000000000000000000000';

    const res = await request(app)
      .delete(`/api/posts/${fakeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });

});