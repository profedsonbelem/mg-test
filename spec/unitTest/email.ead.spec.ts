import { assert } from "chai";
import { getXMLFromEmail } from "../../src/utils/email/email.utils";


describe('test suite for email.utils.ts', () => {
   
    before(() => {
        
    })

    it('test Sucess: getXMLFromEmail', () => {
        
        //arrange
        const emailBody = '<head></head><body><br>ebelem@mggestoes.com.br</body>';
        const emailReturn =  '<head></head><body>ebelem@mggestoes.com.br</body>';
        //act
        let xmlReturn = getXMLFromEmail(emailBody);
        //assert
        assert.equal(`<xml>${emailReturn}</xml>`, xmlReturn)
    })

    it('test Not Sucess: getXMLFromEmail', () => {
        
        //arrange
        const emailBody = '<head></head><body><br/>ebelem@mggestoes.com.br</body>';
        const emailReturn =  '<head></head><body>ebelem@mggestoes.com.br</body>';
        //act
        let xmlReturn = getXMLFromEmail(emailBody);
        //assert
        assert.notEqual(`<xml>${emailReturn}</xml>`, xmlReturn)
    })
})

