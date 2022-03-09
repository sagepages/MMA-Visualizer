const express = require('express')
const cors = require("cors")
const app = express()
const dotenv = require("dotenv")
const port = process.env.PORT || 3001 
const mountRoutes = require('./router')

dotenv.config()

app.use(cors())
app.use(express.json())

mountRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

