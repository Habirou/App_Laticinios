import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {

    async index(req: Request, res: Response) {
        const result = await knex('rtqccrmv')

        return res.json(result)

    },

    async create(req: Request, res: Response, next:any) {
        
        try {

        const { councilNumber, bossQualityControl, crmv } = req.body
        const { userId } = req.params

        await knex('rtqccrmv')
        .create({ councilNumber, bossQualityControl, crmv })
        .where({ userId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }

    },

    async update(req: Request, res: Response, next:any) {
        
        try {

        const { councilNumber, bossQualityControl, crmv } = req.body
        const { responsibleId } = req.params

        await knex('rtqccrmv')
        .update({ councilNumber, bossQualityControl, crmv })
        .where({ responsibleId })

            return res.send()

        } catch(error) {
            next(error)
        }

    },

    async delete(req: Request, res: Response, next:any) {
        
        try {

        const { responsibleId } = req.params

        await knex('rtqccrmv')
        .where({ responsibleId })
        .del()

            return res.send()

        } catch(error) {
            next(error)
        }

    }

}