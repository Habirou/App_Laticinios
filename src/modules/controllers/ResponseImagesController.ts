import { Request, Response } from "express";
const knex = require('../../shared/infra/knex/connection');

interface IFiles {
    filename: string;
}

module.exports = {

    async create(req: Request, res: Response, next: any) {
        try {
            const { responseId } = req.params;
            const images = req.files as IFiles[];
            console.log("oiiii")
            const images_name = images.map((file) => file.filename);

            images_name.map(async (imageFileName) => {
                await knex('responseImages').insert({
                    responseId,
                    imageFileName
                }).where({ responseId })             
            });


            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    }

}