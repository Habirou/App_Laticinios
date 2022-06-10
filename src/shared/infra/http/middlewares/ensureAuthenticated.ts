import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
const knex = require('../../knex/connection')
import { AppError } from "../../../errors/AppErrors";

interface IpayLoad {
    sub: string;
}


export async function ensureAuthenticate(request:Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
        
    }

    const [, token] = authHeader.split(" ")
    console.log(authHeader)

    try {
        const { sub: loginId } = verify(token, "f968930f67be264f2c1bfb80adf27ba7") as IpayLoad;
        
        const conversion = parseFloat(loginId);

        const loginVerification = await knex.select('loginId').from('logins').where({ conversion });

        if (!loginVerification) {
            throw new AppError("Login doesn't exists", 401);
            
        }

        //request.login = {
        //    id: conversion,
        //};

        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }

}