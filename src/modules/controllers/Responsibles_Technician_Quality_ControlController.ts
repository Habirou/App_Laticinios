import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {

    async index(req: Request, res: Response) {
        const result = await knex('rtqc')

        return res.json(result)

    },

    async create(req: Request, res: Response, next:any) {
        
        try {

        const { councilNumber, bossQualityControl, crq } = req.body
        const { userId } = req.params

        await knex('rtqc')
        .create({ councilNumber, bossQualityControl, crq })
        .where({ userId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }

    },

    async update(req: Request, res: Response, next:any) {
        
        try {

        const { councilNumber, bossQualityControl, crq } = req.body
        const { responsibleId } = req.params

        await knex('rtqc')
        .update({ councilNumber, bossQualityControl, crq })
        .where({ responsibleId })

            return res.send()

        } catch(error) {
            next(error)
        }

    },

    async delete(req: Request, res: Response, next:any) {
        
        try {

        const { responsibleId } = req.params

        await knex('rtqc')
        .where({ responsibleId })
        .del()

            return res.send()

        } catch(error) {
            next(error)
        }

    }

}