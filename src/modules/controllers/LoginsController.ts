import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');
const bcrypt = require('bcrypt')
const crypto = require('crypto')

/** 
 * 0 - Deve conter letras maiusculas, minusculas e numeros
 * 1 - Senha valida
 * 2 - Senha curta  
*/
function testPassword(password: string) {
    if (password.length >= 8) {
        const upperCase = /[A-Z]/
        const lowerCase = /[a-z]/
        const number = /[0-9]/
        return (upperCase.test(password)
            && lowerCase.test(password)
            && number.test(password))
    }
    return 2
}


module.exports = {
    async index(req: Request, res: Response) {
        const result = await knex('logins')

        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {
        try {
            const { email, password } = req.body

            const aux_email = await knex('logins')
                .select("email")
                .where({ email })

            if (aux_email.length == 0) {

                let aux = testPassword(password)
                if (aux == 1) {
                    const hash = await bcrypt.hash(password, 10)
                    // const hash = crypto.createHash("sha256").update(password).digest('hex')

                    await knex('logins').insert({
                        email,
                        password: hash
                    })
                    const [{ loginId }] = await knex('logins')
                        .select('loginId')
                        .where({ email })

                    return res.status(201).send({ loginId })

                } else if (aux == 2) {
                    return res.status(401).send({ message: "A senha deve ter pelo menos 8 dígitos" })
                } else {
                    return res.status(401).send({ message: "A senha deve conter letras maiusculas, minusculas e números" })
                }
            } else {
                return res.status(409).send({ message: 'Email already exists' })
            }

        } catch (error) {
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        try {
            const { email, password } = req.body

            const hash = bcrypt.hash(password, 10, (errBcrypt: any) => {
                if (errBcrypt) {
                    return res.status(500).send({ error: errBcrypt })
                }
            })

            await knex('logins')
                .update({
                    password: hash
                })
                .where({ email })
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
