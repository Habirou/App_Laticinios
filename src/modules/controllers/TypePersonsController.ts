import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection')

module.exports = {

    async index(req: Request, res: Response) {
        const result = await knex('typepersons')

        return res.json(result)
    },

    async create(req: Request, res: Response, next: any) {

        try {
            const { typePerson, activeUser } = req.body
            const { userId } = req.params

            await knex('typepersons')
                .insert({ userId, typePerson, activeUser })
                .where({ userId })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        try {

            const { activeUser } = req.body
            const { userId } = req.params

            await knex('typepersons')
            .update({ activeUser })
            .where({ userId })

            return res.send()

        } catch(error) {
            next(error)
        }
    },

    async delete(req: Request, res:Response, next: any) {
        try {
            const { typePersonId } = req.params

            await knex('typepersons')
            .where({ typePersonId })
            .del()

            return res.send()


        } catch (error) {
            next(error)
        }
    }
}