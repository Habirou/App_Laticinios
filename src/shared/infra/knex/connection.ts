const knexfile = require('../../../../knexfile')
const knex = require('knex')(knexfile['development']) //Retorna uma função

module.exports = knex