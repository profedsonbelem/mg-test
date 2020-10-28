const joi = require('joi')

const listUnidentifiedSuccess = joi.object({
    message: joi.string().required(),
    aditionalInfo: joi.array().items(joi.string()) 
})

module.exports = {
    listUnidentifiedSuccess
}