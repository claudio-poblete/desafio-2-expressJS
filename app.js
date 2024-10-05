const express = require('express')
const path = require('path')
const app = express()
const songRoutes = require('./routes/songRoutes')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', songRoutes)

const port = 3000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
