const express = require("express")
const mysql = require("mysql2/promise")
const app = express()


app.use(express.json())

const BancoDeDados = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "jogos_db"
})

app.get("/jogos", async (req, res) => {
    const [jogos] = await BancoDeDados.execute("SELECT * FROM jogos")
    return res.json(jogos)
})

app.post("/jogos", async (req, res) => {
    const {nome, desenvolvedora, sinopse, genero_id } = req.body

    if(!nome || !desenvolvedora || !sinopse || !genero_id){
        return res.status(400).json({error: "Termine de preencher os requisitos base"})
    }

    if(nome.length < 3){
        return res.status(400).json({error: "Nome precisa ter mais de 2 caracteres"})
    }
    if(desenvolvedora.length < 4){
        return res.status(400).json({error: "Desenvolvedora precisa conter mais que 3 caracteres"})
    }
    if(sinopse.length < 11){
        return res.status(400).json({error: "Sinopse precisa ter mais de 10 caracteres"})
    }
    if(genero_id.length < 2){
        return res.status(400).json({error: "Genero_id precisa ter mais de 1 caracteres"})
    }

    const [resultado] = await BancoDeDados.execute(
        "INSERT INTO jogos(nome, desenvolvedora, sinopse, genero_id) VALUES (?, ?, ?, ?)",
        [nome, desenvolvedora, sinopse, genero_id]
    )

    return res.status(201).json({id: resultado.insertId, nome, desenvolvedora, sinopse, genero_id})
})

app.get("/genero", async (req, res) => {
    const [genero] = await BancoDeDados.execute("SELECT * FROM genero")
    return res.json(genero)
})

app.post("/genero", async(req, res) => {
    const {nome_genero, descricao} = req.body

    if(!nome || !desenvolvedora || !sinopse ||!genero_id){
        return res.status(400).json({error: "nome_genero, descricao são obrigatorios"})
    }

    const [resultado] = BancoDeDados.execute(
        "INSERT INTO genero(nome_genero, descricao) VALUES (?, ?, ?, ?)",
        [nome_genero, descricao]
    )
})

app.delete("/genero/:id", async (req, res) => {
    const id = req.params.id
    const [resultado] = await BancoDeDados.execute(
        "DELETE FROM genero WHERE id = ?",
        [id]
    )

    if(resultado.affectedRows === 0) {
        return res.status(400).json({error: "Genero nao encontrado"})
    }

    return res.status(204).end()

})

app.listen(3000, () => console.log("API no ar"))