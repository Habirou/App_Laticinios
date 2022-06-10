import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');
const bcrypt = require('bcrypt')

module.exports = {
    async index(req: Request, res: Response) {
        const result = await knex('logins')

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {
        try {
            const { email, password } = req.body

            const hash = await bcrypt.hash(password, 10)

            await knex('logins').insert({
                email,
                password: hash
            })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        try {
            const { password } = req.body
            const { loginId } = req.params

            const hash = bcrypt.hash(password, 10, (errBcrypt: any) => {
                if (errBcrypt) {
                    return res.status(500).send({ error: errBcrypt })
                }

            })

            await knex('logins')
                .update({
                    password: hash
                })
                .where({ loginId })

            return res.status(200).send()
        } catch (error) {
            next(error)
        }
    },

    async delete(req: Request, res: Response, next: any) {
        try {
            const { loginId } = req.params

            await knex('logins')
                .where({ loginId })
                .del()

            return res.send()
        } catch (error) {
            next(error)
        }
    },

}