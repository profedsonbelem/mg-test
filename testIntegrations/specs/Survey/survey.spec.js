var chai = require("chai");
var expect = chai.expect;
var request = require("supertest");
const Joi = require("@hapi/joi");
const commons = require('../../commons');
const survey = require("../../schemas/survey.schema");
const url = commons.SmallServiceURL.urlLocal

describe('Testando Endpoint da Collection de "Contacts"', () => {
    it('Survey - "/survey/questIds" - Contrato', function (done) {
        request(url)
            .get('/survey/questIds')
            .set('Authorization', commons.SmallServiceURL.tokenFixo)
            .send({ "email": "yvilela@mggestoes.com.br" })
            .expect('Content-Type', /json/)
            .end(function  (err, res) {
                Joi.assert(res.body, survey.listUnidentifiedSuccess, 'API nao encontrada', { abortEarly: false })
                done()
            })

    })

    it('Survey - "/survey/questIds" - Healthcheck', function (done) {
        request(url)
            .get('/survey/questIds')
            .set('Authorization', commons.SmallServiceURL.tokenFixo)
            .send({ "email": "yvilela@mggestoes.com.br" })
            .expect('Content-Type', /json/)
            .end(function  (err, res) {
                expect(res.status).to.be.equal(200);
                done()
            })

    })

    it('Survey - "/survey/questIds" - Unauthorized', function (done) {
        request(url)
            .get('/survey/questIds')
            .set('Authorization', 'xpto')
            .expect('Content-Type', /json/)
            .end(function  (err, res) {
                expect(res.status).to.be.equal(403);
                done()
            })

    })
})
