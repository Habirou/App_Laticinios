import { Request, Response } from "express";
import express from 'express';

const routes = require("../routes")



const app = express();


app.use(routes);

//app.use(cors());

//Fazendo um middlewere
app.use((error: any, req: Request, res: Response, next: any) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
} )

app.listen(3307, () => console.log("Server running in port 3307"));