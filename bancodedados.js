const mongoose = require('mongoose')
require('dotenv').config()

const dns = require('dns')

// Garante a resolução DNS no Node.js
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function conectabancodedados() {
    try {        
        console.log("A conexao com o banco de dados iniciou")

        const uri = process.env.MONGO_URL

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS:5000
        })
    
        console.log('A conexao com o banco de dados foi estabelecida com sucesso!')
    } catch (error) {
        console.error('Erro ao conectar como banco de dados:', error.message)
        
    }    
}
module.exports = conectabancodedados