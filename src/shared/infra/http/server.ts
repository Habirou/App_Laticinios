import { Request, Response } from "express";
import express from 'express';
import cors from "cors";
const routes = require("../routes")

//import "@shared/infra/knex/connection";

const app = express();
app.use(express.json());
app.use(routes);

//app.use(cors());

//Fazendo um middlewere
app.use((error: any, req: Request, res: Response, next: any) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
} )

app.listen(3307, () => console.log("Server running in port 3307"));