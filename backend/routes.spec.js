const request = require('supertest');
const server = require('./server.js');

beforeAll(async () => {
    console.log('Starting tests!');
});

afterAll(async () => {
    server.close()
});

describe('Get Jurisdiction contact infos', () => {
    it('should return jurisdiction contactInfos object', async () => {
        const response = await request(server).get('/getJurisdictionContactInfos/JUR64FE952E9CA370DAC630');
        expect(response.status).toEqual(200);
        expect(typeof(response.body.contactInfos)).toBe('object');           // expect(typeof(response.body.contactInfos.telephone)).toBe('array');
    });
    it("should contain a list of phone numbers", async() =>{
        const response = await request(server).get('/getJurisdictionContactInfos/JUR64FE952E9CA370DAC630');
        expect(typeof(response.body.telephone).toBe('array'))
    })

});
