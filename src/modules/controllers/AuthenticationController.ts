import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { AppError } from "../../shared/errors/AppErrors";
const knex = require('../../shared/infra/knex/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = {

    async authentication(req: Request, res: Response, next: any) {

        const { email, password } = req.body

        try {

            let verifyEmail = await knex.select('email').from('logins').where({ email })

            if (verifyEmail) {
                let verifyPassword = await knex.select('password').from('logins').where({ email })


                const match = await bcrypt.compare(password, verifyPassword[0].password)

                if (match) {
                    const loginId =  await knex.select('loginId').from('logins').where({ email })

                    const token = sign({}, "f968930f67be264f2c1bfb80adf27ba7", {
                        subject: loginId.toString(),
                        expiresIn: "1d"
                    });

                    res.send({ message: "Autenticado com sucesso!",
                    token: token, 
                    userId: loginId })
                }
                else {
                    throw new AppError("password dont macth");
                    
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

}