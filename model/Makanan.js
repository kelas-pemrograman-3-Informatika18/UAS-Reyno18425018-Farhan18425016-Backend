const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MakananSchema = new Schema({
  makanan: {
      type: String
  },
  harga: {
      type: Number
  },
  deskripsi: {
      type: String
  },
  image: {
      type: String
  }
})

module.exports = mongoose.model('makanan', MakananSchema)