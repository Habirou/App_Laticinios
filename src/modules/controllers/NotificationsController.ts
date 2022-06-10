import { Request, Response } from "express";

const knex = require('../../shared/infra/knex/connection');

module.exports = {

    async index(req: Request, res: Response) {
        const result = knex('notifications')

        return res.json(result)
    },

    async create(req: Request, res: Response, next:any) {
        
        try {

        const { description } = req.body
        const { userId } = req.params

        await knex('notifications')
        .create({ description })
        .where({ userId })

            return res.status(201).send()

        } catch(error) {
            next(error)
        }

    },

    async update(req:Request, res: Response, next:any) {
        try {

            const { description } = req.body
            const { notificationId } = req.params
    
            await knex('notifications')
            .update({ description })
            .where({ notificationId })
    
                return res.send()
    
            } catch(error) {
                next(error)
            }
    },

    async delete(req: Request, res: Response, next:any) {
        try {

            const { notificationId } = req.params
    
            await knex('notifications')
            .where({ notificationId })
            .del()
    
                return res.send()
    
            } catch(error) {
                next(error)
            }
    }


}