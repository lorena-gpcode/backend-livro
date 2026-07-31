const mongoose = require('mongoose')
const { type } = require('node:os')

const livroSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    resumo: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('livro', livroSchema)