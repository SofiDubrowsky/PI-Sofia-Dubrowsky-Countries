const app = require('../src/server')
const session = require('supertest')
const request = session(app)
const {Activity} = require('../src/db')

//----------------------------------COUNTRIES-------------------------------------
describe('Test de RUTAS COUNTRIES', () => {
  it('Trae todos lo paises dentro de un array', async () => {
    const response = await request.get('/countries');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Responde con el pais buscado por query', async () => {
    const response = await request.get('/countries?name=Argentina');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Responde con un array vacio al buscar un pais no existente', async () => {
    const response = await request.get('/countries?name=Nonexistent');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });

  it('Responde con status 200 y trae el pais buscado por ID', async () => {
    const response = await request.get('/countries/ARG');
    expect(response.status).toBe(200);
  });

  it('Responde con estado 400 y el mensaje "ID of country not found" ', async () => {
    const response = await request.get('/countries/XYZ');
    expect(response.status).toBe(400);
    expect(response.text).toBe('ID of country not found');
  });
});

//----------------------------------ACTIVITIES-------------------------------------
describe('Test de RUTAS ACTIVITIES', () => {
  describe('POST /activities', () => {
    it('Deberia crear una nueva actividad', async () => {
      const activityData = {
        name: 'Hiking',
        difficulty: '2',
        duration: '3',
        season: 'Spring',
        countryId: 'ARG'
      };

      const response = await request.post('/activities').send(activityData);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Hiking');
    });
  });

  describe('GET /activities', () => {
    it('Trae todos las actividades dentro de un array', async () => {
      const response = await request.get('/activities');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('DELETE /activities', () => {
    it('Elimina una actividad al pasar el nombre por query y devuelve un estado 200', async () => {
      const activity = await Activity.create({
        name: 'Swimming',
        difficulty: '1',
        duration: '2',
        season: 'Summer',
        countryId: 'USA'
      });

      const response = await request.delete(`/activities?name=${activity.name}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Actividad eliminada');
    });

    it('Responde estado 404, y el mensaje "Actividad no encontrada"', async () => {
      const response = await request.delete('/activities?name=Nonexistent');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Actividad no encontrada');
    });
  });
});