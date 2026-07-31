const express = require('express')
const { request } = require('node:http')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(express.json())

const porta = 3333
const livros = [
    {
    id:'1',
    nome:'A Pianista ',
    autor: 'por Machado de Assis',
    imagem:'https://m.media-amazon.com/images/I/91mYrQm-FGL._SY466_.jpg',
    resumo: 'Elfriede Jelinek, nascida em 20 de outubro de 1946, tem causado polêmica em sua Áustria natal há mais de três décadas, especialmente pelo caráter direto com o qual aborda as questões familiares e temas relativos ao sexo, por oposição aberta ao Partido da Liberdade (extrema direita) e denúncias quanto ao papel desempenhado pela Áustria na política nazista. Dentre seus vários prêmios, destacam-se o Prêmio Nobel de Literatura (2004), três vezes o Mülheimer Dramatistis (2002, 2004, 2009), do qual é recordista, e o Henrich Böll (1986), do qual foi a primeira mulher vencedora.'
    },
    {
    id:'2',
    nome:'101 mulheres incríveis que transformaram a ciência',
    autor: 'Claire Philip',
    imagem:'https://m.media-amazon.com/images/I/71qT4UEbfOL._SY425_.jpg',
    resumo: 'Conheça 101 mulheres incríveis que revolucionaram o mundo da ciência, das mais célebres até as menos conhecidas, históris inspiradoras e admiraveis'
    },
    {
     id:'3',
    nome:'Mulheres na Ciência: O que mudou e o que a ainda precisamos mudar',
    autor: ' Tatiana Roque',
    imagem:'https://m.media-amazon.com/images/I/71vBDOsDf+L._SY466_.jpg',
    resumo: 'Mulheres na Ciência – o que mudou e o que ainda precisamos mudar, organizado pelas pesquisadoras Letícia de Oliveira e Tatiana Roque, constitui uma importante pesquisa sobre a participação das mulheres no universo das Ciências'
    }    
    
]

function criaLivro(request, response){
    const novolivro = 
    {
       id : uuidv4(),
       nome: request.body.nome,
       autor: request.body.autor,
       imagem: request.body.imagem,
       resumo: request.body.resumo
    } 

    livros.push(novolivro)

    response.status(200).json(livros)
       
}

function mostraLivro(resquest, response){
    response.json(livros)
}

function mostraPorta(){
    console.log("Servidor criado em porta na porta", porta)

}

function corrigeLivro(request, response){

    const livroEncontrado = livros.find(livro => livro.id === request.params.id)
    
        if(!livroEncontrado){
            return response.status(404).json({mensagem:" Livro não encontrado!"})
        }

        if (request.body.nome){
            livroEncontrado.nome = request.body.nome
        }
        if (request.body.autor){
            livroEncontrado.autor = request.body.autor
        }
        if (request.body.imagem){
            livroEncontrado.imagem = request.body.imagem
        }
        if (request.body.resumo){
            livroEncontrado.resumo = request.body.resumo
        }
        return response.status(200).json(livroEncontrado)

}

function deletaLivro(request, response){   
     const indice = livros.findIndex(livro => livro.id === request.params.id)

    if (indice === -1) {
        return response.status(404).json({ mensagem: "Livro não encontrado!" })
    }

    livros.splice(indice, 1)

    return response.status(200).json({
        mensagem: "livro deletado com sucesso",
        livrosAtualizados: livros
    })
}

app.delete('/livros/:id', deletaLivro)
app.patch('/livros/:id', corrigeLivro)
app.post('/livros', criaLivro)
app.get('/livros',mostraLivro)
app.listen(porta, mostraPorta)