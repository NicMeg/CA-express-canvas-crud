const express = require('express')
const Drawing = require('../models/drawing')
const router = express.Router()

router.get('/new', (req, res) => {
  console.log(req.user)
  res.render('drawings/new', { drawing: new Drawing(), loggedIn: req.user })
})

router.get('/edit/:id', async (req, res) => {
  const drawing = await Drawing.findById(req.params.id)
  res.render('drawings/edit', { drawing: drawing, loggedIn: req.user })
})

router.get('/:slug', async (req, res) => {
  const drawing = await Drawing.findOne( {slug: req.params.slug})
  if (drawing == null ) res.redirect('/')
  res.render('drawings/show', { drawing: drawing, loggedIn: req.user })
})

router.post('/', async (req, res, next) => {
  req.drawing = new Drawing()
  next()
}, saveDrawingAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.drawing = await Drawing.findById(req.params.id)
  next()
}, saveDrawingAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Drawing.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveDrawingAndRedirect(path){
  return async (req, res) => {
    let drawing = req.drawing
    drawing.title =  req.body.title,
    drawing.description =  req.body.description,
    drawing.markdown = req.body.markdown
    try {
      drawing = await drawing.save()
      res.redirect(`/drawings/${drawing.slug}`)
    } catch (error) {
      res.render(`drawings/${path}`, { drawing: drawing, loggedIn: req.user })
    }
  }
}

module.exports = router