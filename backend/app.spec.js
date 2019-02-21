const request = require('supertest');
const server = require('./server.js');

beforeAll(async () => {
    console.log('Starting tests!');
    jest.setTimeout(30000);
});

afterAll(async () => {
    server.close()
});

describe('Get Jurisdiction contact infos', () => {
    it('should return jurisdiction contactInfos object', async () => {
        const expectedResponse = {
            "contactInfos": {
                "telephone": [
                    {
                        "data": "0144329595",
                        "verified": true
                    },
                    {
                        "data": "0685545714",
                        "verified": true
                    }
                ],
                "email": [
                    {
                    "data": "biblio.courdecassation@justice.fr",
                    "verified": true
                    }
                ],
                "fax": []
            }
        }
        const response = await request(server).get('/getJurisdictionContactInfos/JUR359D88F9B71718E7F4A6');
        expect(response.status).toEqual(200);
        expect(typeof(response.body.contactInfos)).toBe('object');
        expect(response.body).toMatchObject(expectedResponse)
    });
});

describe('Get Jurisdiction details and decisions', () => {
    describe('Get StateCouncil data', () => {
        it('should return the State Council jurisdiction Data', async() => {
            const expectedResponse = {
                "jurisdiction_infos": {
                    "id": 2,
                    "jurisdiction_id": "JUR64FE952E9CA370DAC630",
                    "pivot_local": "ce",
                    "name": "Conseil d'État",
                    "address": "1 Place du Palais Royal",
                    "postal_code": "75001",
                    "commune_name": "PARIS",
                    "telephone": "0140208000",
                    "fax": null,
                    "email": null,
                    "website": "http://www.conseil-etat.fr/"
                }
            }
            const response = await request(server).get('/jurisdiction/JUR64FE952E9CA370DAC630')
            expect(response.status).toEqual(200);
            expect(response.body).toMatchObject(expectedResponse);
        })
    })
    describe('Get Cassation data and decisions', () => {
        it('should return the Cassation jurisdiction Data and decisions', async() => {
            const expectedResponse = {
                "jurisdiction_infos": {
                    "id": 1,
                    "jurisdiction_id": "JUR359D88F9B71718E7F4A6",
                    "pivot_local": "cass",
                    "name": "Cour de cassation",
                    "address": "5 Quai de l'Horloge",
                    "postal_code": "75055",
                    "commune_name": "PARIS CEDEX 01",
                    "telephone": "0144329595",
                    "fax": null,
                    "email": null,
                    "website": "https://www.courdecassation.fr",
                    "decisions": [
                        {
                            "title": "Cour de cassation, criminelle, Chambre criminelle, 31 octobre 2017, 17-80.872, Publié au bulletin",
                            "url": "localhost:8080/JURITEXT000035974619",
                            "formation": "CHAMBRE_CRIMINELLE",
                            "solution": "Cassation partielle",
                            "dec_date": "2017-10-31"
                            },
                            {
                            "title": "Cour de cassation, criminelle, Chambre criminelle, 31 octobre 2017, 16-86.897, Publié au bulletin",
                            "url": "localhost:8080/JURITEXT000035974645",
                            "formation": "CHAMBRE_CRIMINELLE",
                            "solution": "Cassation",
                            "dec_date": "2017-10-31"
                            },
                            {
                            "title": "Cour de cassation, criminelle, Chambre criminelle, 31 octobre 2017, 17-80.710, Publié au bulletin",
                            "url": "localhost:8080/JURITEXT000035974612",
                            "formation": "CHAMBRE_CRIMINELLE",
                            "solution": "Cassation sans renvoi",
                            "dec_date": "2017-10-31"
                            },
                            {
                            "title": "Cour de cassation, criminelle, Chambre criminelle, 31 octobre 2017, 16-83.683, Publié au bulletin",
                            "url": "localhost:8080/JURITEXT000035974616",
                            "formation": "CHAMBRE_CRIMINELLE",
                            "solution": "Cassation et désignation de juridiction",
                            "dec_date": "2017-10-31"
                            },
                            {
                            "title": "Cour de cassation, criminelle, Chambre criminelle, 25 octobre 2017, 16-83.724, Publié au bulletin",
                            "url": "localhost:8080/JURITEXT000035924269",
                            "formation": "CHAMBRE_CRIMINELLE",
                            "solution": "Cassation partielle",
                            "dec_date": "2017-10-25"
                            },
                            {
                            "title": "Cour de cassation, criminelle, Chambre criminelle, 24 octobre 2017, 16-85.875, Publié au bulletin",
                            "url": "localhost:8080/JURITEXT000035923944",
                            "formation": "CHAMBRE_CRIMINELLE",
                            "solution": "Cassation",
                            "dec_date": "2017-10-24"
                            },
                            {
                            "title": "Cour de cassation, criminelle, Chambre criminelle, 24 octobre 2017, 16-85.975, Publié au bulletin",
                            "url": "localhost:8080/JURITEXT000035923898",
                            "formation": "CHAMBRE_CRIMINELLE",
                            "solution": "Cassation partielle sans renvoi",
                            "dec_date": "2017-10-24"
                            },
                            {
                            "title": "Cour de cassation, criminelle, Chambre criminelle, 17 octobre 2017, 16-87.249, Publié au bulletin",
                            "url": "localhost:8080/JURITEXT000035847413",
                            "formation": "CHAMBRE_CRIMINELLE",
                            "solution": "Cassation et désignation de juridiction",
                            "dec_date": "2017-10-17"
                            },
                            {
                            "title": "Cour de cassation, criminelle, Chambre criminelle, 17 octobre 2017, 16-83.643, Publié au bulletin",
                            "url": "localhost:8080/JURITEXT000035847400",
                            "formation": "CHAMBRE_CRIMINELLE",
                            "solution": "Cassation et désignation de juridiction",
                            "dec_date": "2017-10-17"
                            },
                            {
                            "title": "Cour de cassation, criminelle, Chambre criminelle, 11 octobre 2017, 16-86.868, Publié au bulletin",
                            "url": "localhost:8080/JURITEXT000035806734",
                            "formation": "CHAMBRE_CRIMINELLE",
                            "solution": "Cassation sans renvoi",
                            "dec_date": "2017-10-11"
                            }
                    ]
                }
                    
            }
            const response = await request(server).get('/jurisdiction/JUR359D88F9B71718E7F4A6')
            expect(response.status).toEqual(200);
            expect(response.body).toMatchObject(expectedResponse);
        })
    })
})

describe('Get Decision Data', () => {
    it('should return decision data with title and decision', async () => {
        const expectedResponse = {
            "decision": {
                "title": "",
                "ana_summary": ""
            }
        }
        const response = await request(server).get('/getJurisdictionContactInfos/JUR359D88F9B71718E7F4A6');
        expect(response.status).toEqual(200);
        expect(typeof(response.body.contactInfos)).toBe('object');
        expect(response.body).toMatchObject(expectedResponse)
    });
});
