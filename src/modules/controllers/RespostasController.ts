import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {
    async index(req: Request, res: Response) {
        const result = await knex('responses')

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {
        try {
            const { observation } = req.body
            const { questionId, userId } = req.params


            await knex('responses').insert({
                observation,
                questionId,
                userId
            }).where({ questionId, userId })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        try {
            const { observation, image } = req.body
            const { responseId } = req.params

            await knex('responses')
                .update({
                    observation,
                    image
                })
                .where({ responseId })

            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    },

    async delete(req: Request, res: Response, next: any) {
        try {
            const { responseId } = req.params

            await knex('responses')
                .where({ responseId })
                .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },

}