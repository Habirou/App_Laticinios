import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {
    
    async index(req: Request, res: Response) {
        const result = await knex('consultancys')

        return res.json(result)
    },

    async create(req: Request, res: Response, next:any) {
        
        try {

        const { crmv } = req.body
        const { userId } = req.params

        await knex('consultancys')
        .create({ crmv })
        .where({ userId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }

    },

    async update(req:Request, res: Response, next:any) {
        try {

            const { crmv } = req.body
            const { consultancyId } = req.params
    
            await knex('consultancys')
            .update({ crmv })
            .where({ consultancyId })
    
                return res.send()
    
            } catch(error) {
                next(error)
            }
    },

    async delete(req: Request, res: Response, next:any) {
        try {

            const { consultancyId } = req.params
    
            await knex('consultancys')
            .where({ consultancyId })
            .del()
    
                return res.send()
    
            } catch(error) {
                next(error)
            }
    }



}