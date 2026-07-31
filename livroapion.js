const express = require('express')
const cors = require('cors')

const conectabancodedados = require('./bancodedados')
conectabancodedados()

const Livro = require('./livrosmodel')

const app = express()

app.use(express.json())
app.use(cors())

// Rota raiz para o Render dar 200 OK ao acessar a URL principal
app.get('/', (request, response) => {
    response.status(200).send('API de Livros rodando com sucesso no Render!')
})

// --- ROTAS DO CRUD ---

// 1. Criar Livro
async function criaLivro(request, response) {
    const novoLivro = new Livro({
        nome: request.body.nome,
        autor: request.body.autor,
        imagem: request.body.imagem,
        resumo: request.body.resumo
    })
    try {
        const livrocriado = await novoLivro.save()
        response.status(201).json(livrocriado)
    } catch (error) {
        console.log(error)
        response.status(500).json({ mensagem: "Erro ao criar livro" })        
    }        
}

// 2. Listar Livros (Buscando direto do MongoDB)
async function mostraLivro(request, response) {
    try {
        const livrosDoBanco = await Livro.find()
        response.json(livrosDoBanco)
    } catch (error) {
        console.error(error)
        response.status(500).json({ mensagem: "Erro ao buscar livros" })
    }
}

// 3. Atualizar Livro (Com .save() no banco)
async function corrigeLivro(request, response) {
    try {
        const livroEncontrado = await Livro.findById(request.params.id)
            
        if (!livroEncontrado) {
            return response.status(404).json({ mensagem: "Livro não encontrado!" })
        }

        if (request.body.nome) livroEncontrado.nome = request.body.nome
        if (request.body.autor) livroEncontrado.autor = request.body.autor
        if (request.body.imagem) livroEncontrado.imagem = request.body.imagem
        if (request.body.resumo) livroEncontrado.resumo = request.body.resumo

        const livroAtualizado = await livroEncontrado.save()
        return response.status(200).json(livroAtualizado)
    } catch (error) {
        console.error(error)
        return response.status(500).json({
            mensagem: "Erro ao atualizar o livro ou ID inválido"
        })        
    }
}

// 4. Deletar Livro
async function deletaLivro(request, response) {   
    try {
        const livroDeletado = await Livro.findByIdAndDelete(request.params.id)

        if (!livroDeletado) {
            return response.status(404).json({ mensagem: "Livro não encontrado!" })
        }

        return response.status(200).json({ mensagem: "Livro deletado com sucesso" })
    } catch (error) {
        console.error(error)
        return response.status(500).json({ mensagem: "Erro ao deletar o livro ou ID inválido" })
    }
} 

// Mapeamento das rotas
app.post('/livros', criaLivro)
app.get('/livros', mostraLivro)
app.patch('/livros/:id', corrigeLivro)
app.delete('/livros/:id', deletaLivro)

// Configuração da Porta dinâmica para o Render
const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
