import { Request, Response } from 'express'

const knex = require('../../shared/infra/knex/connection')

module.exports = {

    async index(req: Request, res: Response) {
        const result = await knex('naturalpersons')

        return res.json(result)
    },

    async create(req: Request, res: Response, next: any) {

        try {

            const { cpf, rg } = req.body
            const { userId } = req.params

            await knex('naturalpersons')
                .create({ cpf, rg })
                .where({ userId })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next:any) {

        try {

            const { cpf, rg } = req.body
            const { naturalPersonId } = req.params

            await knex('naturalpersons')
            .update({ cpf, rg })
            .where({ naturalPersonId })

            return res.send()

        } catch (error) {
            next(error)
        }

    },

    async delete(req: Request, res:Response, next:any) {
        try {

            const { naturalPersonId } = req.body

            await knex('naturalpersons')
            .where({ naturalPersonId })
            .del()

            return res.send()

        } catch(error) {
            next(error)
        }
    }

}