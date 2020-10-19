const express = require('express')
const mongoose = require('mongoose')
const Drawing = require('./models/drawing')
const drawingRouter = require('./routes/drawings')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const drawings = await Drawing.find().sort({ createdAt: 'desc'})
  res.render('drawings/index', { drawings: drawings })
})

app.use('/drawings', drawingRouter)

app.listen(3000)