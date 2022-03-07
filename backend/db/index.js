const {Pool } = require("pg")
const dotenv = require("dotenv")

dotenv.config()

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

  module.exports = {
    query: (text, params) => pool.query(text, params),
}