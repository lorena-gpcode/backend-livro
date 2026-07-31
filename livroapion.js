const express = require('express')
const cors = require('cors')

const conectabancodedados = require('./bancodedados')
conectabancodedados()

const Livro = require('./livrosmodel')

const app = express()

app.use(express.json())
app.use(cors())

const porta = 3333

async function criaLivro(request, response){
    const novoLivro = new Livro({
        nome: request.body.nome,
        autor: request.body.autor,
        imagem: request.body.imagem,
        resumo: request.body.resumo
    })
    try {
        const livrocriado = await novoLivro.save()
        response.status(200).json(livrocriado)
    } catch (error) {
        console.log(error)
        response.status(500).json({mensagem: "Erri ao criar livro"})        
    }       
}

 async function mostraLivro(resquest, response){
    response.json(livros)
}

 async function mostraPorta(){
    console.log("Servidor criado em porta na porta", porta)

}

async function corrigeLivro(request, response){
    try {

        const livroEncontrado = await Livro.findById(request.params.id)
           
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
    catch (error) {
        console.error(error)
        return response.status(500).json({
            mensagem: "Erro ao atualizar o livro ou id inválido"
        })        
    }
}


async function deletaLivro(request, response){   

    try {
      const livroDeletado = await Livro.findByIdAndDelete(request.params.id)

       if (!livroDeletado) {
             return response.status(404).json({ mensagem: "Livro não encontrado!" })
    }

    return response.status(200).json({
        mensagem: "livro deletado com sucesso",
        livrosAtualizados: livros })

    } catch (error)  {
        console.error(error)
        return response.status(500).json({  mensagem:"Erro ao deletar o livro ou id invalido"})
        
    }
} 
   


app.delete('/livros/:id', deletaLivro)
app.patch('/livros/:id', corrigeLivro)
app.post('/livros', criaLivro)
app.get('/livros',mostraLivro)
app.listen(porta, mostraPorta)