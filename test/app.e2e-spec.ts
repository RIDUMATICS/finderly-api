import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from 'src/location/entities/location.entity';

const lagos = {
  id: 'lagos',
  website: 'https://www.lagos.com',
  description: 'lagos state',
  phone: '+2348122689423',
  contactPerson: 'ridwan',
  longitude: 3.406448,
  latitude: 6.465422,
};

const oyo = {
  id: 'oyo',
  website: 'https://www.ibadan.com',
  description: 'oyo state',
  phone: '+2348122689423',
  contactPerson: 'ridwan',
  longitude: 3.9368,
  latitude: 7.843,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<LocationEntity>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  it('POST /api/v1/locations (create a location)', async () => {
    const response = await request(app.getHttpServer())
      .post('/locations')
      .send(lagos);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('website');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('phone');
    expect(response.body).toHaveProperty('contactPerson');
    expect(response.body).toHaveProperty('longitude');
    expect(response.body).toHaveProperty('latitude');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body.id).toBe(lagos.id);
  });

  it('POST /api/v1/locations (create another location)', async () => {
    const response = await request(app.getHttpServer())
      .post('/locations')
      .send(oyo);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBe(oyo.id);
  });

  it('UPDATE /api/v1/locations (update location)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/locations/oyo')
      .send({
        contactPerson: 'Oluwatobi',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(oyo.id);
    expect(response.body.contactPerson).toBe('Oluwatobi');
  });

  it('GET /api/v1/locations (Get all locations)', async () => {
    const response = await request(app.getHttpServer()).get('/locations');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('GET /api/v1/locations/distance (Calculate distance between two locations)', async () => {
    const response = await request(app.getHttpServer())
      .get('/locations/distance')
      .query({
        locationA: 'lagos',
        locationB: 'oyo',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('distance');
    expect(response.body.distance).toBe(163.97454625724427);
  });

  it('GET /api/v1/locations/:id (Get a specific location)', async () => {
    const response = await request(app.getHttpServer()).get(
      `/locations/${lagos.id}`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(lagos.id);
    expect(response.body.latitude).toBe(lagos.latitude);
    expect(response.body.longitude).toBe(lagos.longitude);
  });

  it('DELETE /api/v1/locations/lagos (delete (lagos) locations)', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/locations/${lagos.id}`,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.affected).toBe(1);
  });

  it('DELETE /api/v1/locations/oyo (delete (oyo) locations)', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/locations/${oyo.id}`,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.affected).toBe(1);
  });

  afterAll(async () => {
    await app.close();
  });
});
