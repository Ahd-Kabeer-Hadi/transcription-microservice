import request from 'supertest';
import app from '../src/app';

describe('Transcription API', () => {
  it('should create a new transcription', async () => {
    const res = await request(app)
      .post('/api/transcriptions')
      .set('Authorization', 'Bearer test-token')
      .send({ videoUrl: 'https://www.youtube.com/watch?v=dE66vzI75P0' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('transcription');
    expect(res.body).toHaveProperty('language');
  });
});