import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

module.exports = {
    async index(req: Request, res: Response) {
        const result = await knex('questions')

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {
        try {
            const { questionContext, questinText } = req.body
            const { checklistId } = req.params


            await knex('questions').insert({
                questionContext,
                questinText,
                checklistId
            }).where({ checklistId })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        try {
            const { questionContext, questinText } = req.body
            const { questionId } = req.params

            await knex('questions')
                .update({
                    questionContext,
                    questinText
                })
                .where({ questionId })

            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    },

    async delete(req: Request, res: Response, next: any) {
        try {
            const { questionId } = req.params

            await knex('questions')
                .where({ questionId })
                .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },

}