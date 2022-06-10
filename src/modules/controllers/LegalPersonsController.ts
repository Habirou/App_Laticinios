import { Request, Response } from 'express'

const knex = require('../../shared/infra/knex/connection')

module.exports = {

    async index(req: Request, res: Response) {
        const result = knex('legalpersons')

        return res.json(result)
    },

    async create(req: Request, res: Response, next: any) {

        try {

            const { corporateName,
                fantasyName,
                cnpj,
                stateRegistration,
                municipalRegistration } =
                req.body

            const { userId } = req.body

            await knex('legalpersons')
                .create({
                    corporateName,
                    fantasyName,
                    cnpj,
                    stateRegistration,
                    municipalRegistration
                })
                .where({ userId })

            return res.status(201).send()


        } catch (error) {
            next(error)
        }

    },

    async update(req: Request, res: Response, next: any) {

        try {
            const { corporateName,
                fantasyName,
                cnpj,
                stateRegistration,
                municipalRegistration } =
                req.body

            const { legalPersonId } = req.params

            await knex('legalpersons')
                .update({
                    corporateName,
                    fantasyName,
                    cnpj,
                    stateRegistration,
                    municipalRegistration
                })
                .where({ legalPersonId })

            return res.send()

        } catch (error) {
            next(error)
        }

        const { legalPersonId } = req.body

    },

    async delete(req: Request, res: Response, next: any) {
        try {

            const { legalPersonId } = req.params

            await knex('legalpersons')
            .where({ legalPersonId })
            .del()

            return res.send()

        } catch(error) {
            next(error)
        }
    }

}