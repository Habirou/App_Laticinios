import { Request, Response } from 'express';

const knex = require('../../shared/infra/knex/connection')

module.exports = {

    async index(req: Request, res: Response) {
        const result = await knex('acess')

        return res.json(result)
    },

    async create(req: Request, res: Response, next: any) {

        try {

            const { TimestampLogin, TimestampLogout } = req.body
            const { loginId } = req.body
            
            await knex('acess')
            .create({ TimestampLogin, TimestampLogout })
            .where({ loginId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        try {

            const { TimestampLogin, TimestampLogout } = req.body
            const { loginId } = req.body

            await knex('acess')
            .update({ TimestampLogin, TimestampLogout})
            .where({ loginId })

            return res.send()

        } catch(error) {
            next(error)
        }
    },

    async delete(req: Request, res: Response, next: any) {
        try {
            const { acessId } = req.body

            await knex('acess')
            .where({acessId })
            .del()

            return res.send()
        } catch(error) {
            next(error)
        }
    }

}