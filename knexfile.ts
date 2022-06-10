import type { Knex } from "knex";
import 'dotenv/config'

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  
  development: {
    client: "mysql2",
    connection: {
      host : process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  }

};

module.exports = config;
