const express = require('express')

const app = express()
const porta = 333

function mostraPorta(){
    console.log("Servidor criado em porta na porta", porta)

}

app.listen(porta, mostraPorta)