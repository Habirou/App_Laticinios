import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {
   
   async index(req: Request, res: Response) {
        const result = await knex('users')

        return res.json(result)

    },

    async create(req: Request, res: Response, next:any) {
        
        try {

        const { registrationNumber } = req.body
        const { userId } = req.params

        await knex('taxauditors')
        .create({ registrationNumber })
        .where({ userId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }

    },

    async update(req:Request, res: Response, next:any) {
        try {

            const { registrationNumber } = req.body
            const { taxAuditorId } = req.params
    
            await knex('taxauditors')
            .update({ registrationNumber })
            .where({ taxAuditorId })
    
                return res.send()
    
            } catch(error) {
                next(error)
            }
    },

    async delete(req: Request, res: Response, next:any) {
        try {

            const { taxAuditorId } = req.params
    
            await knex('taxauditors')
            .where({ taxAuditorId })
            .del()
    
                return res.send()
    
            } catch(error) {
                next(error)
            }
    }



}