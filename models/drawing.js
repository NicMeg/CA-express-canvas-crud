const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const drawingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }, 
  sanitizedHtml: {
    type: String,
    required: true
  }
  // ,  
  // canvas: {
  //   type: Object,
  //   required: false
  // }

})

drawingSchema.pre('validate', function (next){
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }

  if (this.markdown){
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  }

  next()
})

// Creates a table in DB called Drawing with above schema columns
module.exports = mongoose.model('Drawing', drawingSchema)