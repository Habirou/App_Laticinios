import { AppError } from "../../shared/errors/AppErrors";
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

            
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new AppError("Nenhuma imagem foi seletionado");
            }

            const images_name = images.map((file) => file.filename);

            images_name.map(async (imageFileName) => {
                await knex('responseImages').insert({
                    responseId,
                    imageFileName
                }).where({ responseId })             
            });


            return res.status(201).json("Imagem(s) salvo(s) com sucesso").send();
        } catch (error) {
            next(error)
        }
    }

}