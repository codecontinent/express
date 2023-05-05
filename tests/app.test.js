import http from 'supertest';
import app from '../src/app';

describe('Boot the server', () => {
  it('should spin the server with HTTP:200', async () => {
    const response = await http(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('should return a HTTP:404 at /abc', async () => {
    const response = await http(app).get('/abc');
    expect(response.statusCode).toBe(404);
  });

  it('should return a HTTP:200 at /api', async () => {
    const response = await http(app).get('/api');
    expect(response.statusCode).toBe(200);
  });

  it('should return a HTTP:404 at /api/abc', async () => {
    const response = await http(app).get('/api/abc');
    expect(response.statusCode).toBe(404);
  });
});
