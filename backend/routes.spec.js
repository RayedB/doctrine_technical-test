const request = require('supertest');
const server = require('./server.js');

beforeAll(async () => {
    console.log('Starting tests!');
});

afterAll(async () => {
    server.close()
});

describe('Get Jurisdiction contact infos', () => {
    it('should return jurisdiction basic info', async () => {
        const response = await request(server).get('/getJurisdictionContactInfos/JUR64FE952E9CA370DAC630');
        expect(response.status).toEqual(200);
        expect(response.body).toContain("telephone");
    });
});
