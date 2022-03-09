const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query('SELECT * FROM fighters WHERE fid = $1', [id])
  res.send(rows[0])
})
router.get('/api/divisions', async (req, res) => {
  const { rows } = await db.query('SELECT DISTINCT division FROM fighters')
  res.send(rows)
})

router.get('/api/:divisions', async (req,res) => {
  const { divisions } = req.params
  const { rows } = await db.query('SELECT * FROM fighters WHERE division = $1', [divisions])
  res.send(rows)
})
