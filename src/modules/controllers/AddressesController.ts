import { Request, Response } from 'express';
const knex = require('../../shared/infra/knex/connection')

module.exports = {

    async index(req: Request, res: Response) {
        const result = await knex('addresses')

        return res.json(result)
    },

    async create(req: Request, res: Response, next: any) {
        try {
            const { zipCode, city, district,
                street, estate, number, complement, phone } = req.body

            const { userId } = req.params

            await knex('addresses').insert({
                userId,
                zipCode,
                city,
                district,
                street,
                estate,
                number,
                complement,
                phone
            })
            .where({ userId })

            return res.status(201).send()

        } catch (error) {
            next(error)

        }
    },

    async update(req: Request, res: Response, next: any) {

        try {

            const { zipCode,
                city,
                district,
                street,
                estate,
                number,
                complement,
                phone } = req.body

            const { addressId } = req.params

            await knex('addresses')
                .update({
                    zipCode,
                    city,
                    district,
                    street,
                    estate,
                    number,
                    complement,
                    phone
                })
                .where({ addressId })

            return res.status(200).send()
        }
        catch (error) {
            next(error)
        }
    },

    async delete(req: Request, res: Response, next: any) {
        try {
            const { addressId } = req.params

            await knex('addresses')
            .where({ addressId })
            .del()

            return res.send()

        } catch(error) {
            next(error)
        }
    } 

}