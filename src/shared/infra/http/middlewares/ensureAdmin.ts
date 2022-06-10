import { AppError } from "@shared/errors/AppErrors";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(
    request: Request,
    response: Response, 
    next: NextFunction
    ) {
    const { id } = request.login;

    //const usersRepository = new UsersRepository();
    //const user = await usersRepository.findById(id);

    //if (!user.isAdmin) {
       // throw new AppError("User is not Admin");
        
    //}

    return next();
}