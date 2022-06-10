import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {
    async index(req: Request, res: Response) {
        const result = await knex('users')

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {
        try {
            const { name, typePerson } = req.body
            const { loginId } = req.params


            await knex('users').insert({
                name,
                typePerson,
                loginId
            }).where({ loginId })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        try {
            const { name } = req.body
            const { userId } = req.params

            await knex('users')
                .update({
                    name
                })
                .where({ userId })

            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    },

    async delete(req: Request, res: Response, next: any) {
        try {
            const { userId } = req.params

            await knex('users')
                .where({ userId })
                .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },

}