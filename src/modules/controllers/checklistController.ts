import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {
    async index(req: Request, res: Response) {
        const result = await knex('checklists')

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {
        try {
            const { Title, latitude, longitude } = req.body
            const { userId } = req.params

        

            await knex('checklists').insert({
                Title,
                latitude,
                longitude,
                dateTimeResponse: new Date(),
                userId
            }).where({ userId })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        try {
            const { Title, latitude, longitude } = req.body
            const { checklistId } = req.params

            await knex('checklists')
                .update({
                    Title,
                    latitude,
                    longitude
                })
                .where({ checklistId })

            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    },

    async delete(req: Request, res: Response, next: any) {
        try {
            const { checklistId } = req.params

            await knex('checklists')
                .where({ checklistId })
                .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },

}