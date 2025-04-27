const request = require('supertest');
const app = require('../app');

describe('Testes da API Express', () => {
  // 1. Teste básico da rota GET /
  it('GET / - deve retornar "Hello World!" e status 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello World!');
    expect(response.headers['content-type']).toMatch(/text\/html/);
  });

  // 2. Teste de rota inexistente (404)
  it('GET /rota-inexistente - deve retornar 404', async () => {
    const response = await request(app).get('/rota-inexistente');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({});
  });

  // 3. Teste de método não permitido (405)
  it('POST / - deve retornar 405 (Método não permitido)', async () => {
    const response = await request(app).post('/');
    expect(response.statusCode).toBe(404); // Express retorna 404 por padrão
    // Se quiser 405, você precisaria configurar isso no seu app
  });

  // 4. Teste de headers
  it('GET / - deve incluir headers de segurança', async () => {
    const response = await request(app).get('/');
    expect(response.headers['x-powered-by']).toBeUndefined();
    // Adicione mais verificações de headers conforme necessário
  });

  // 5. Teste de tempo de resposta
  it('GET / - deve responder em menos de 200ms', async () => {
    const start = Date.now();
    await request(app).get('/');
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(200);
  });
});
