//cSpell:ignore codigobarra, descricao, preco

const Medico = require('../model/Medico')
const express = require('express')
const { check, validationResult } = require("express-validator")
const router = express.Router()

const auth = require('../middleware/auth')
/*
//Lista todos os médicos
router.get("/", auth, async(req, res) => {
    try{
        const medico = await Medico.find().sort({nome:1})
        res.json(medico)
    } catch (e){
        res.send({error: 'Erro ao obter os Médicos'})
    }
})*/


/**
 * @method - GET
 * @description - Obter lista de medicos
 * @param - /medico/lista
 */

//Lista todos os médicos
router.get("/lista", auth, async(req, res) => {
    try{
        const medico = await Medico.find().sort({nome:1})
        res.json(medico)
    } catch (e){
        res.send({error: 'Erro ao obter os Médicos'})
    }
})


//Informações de um médico específico
/**
 * @method - GET
 * @description - Obter informações de um determinado médico
 * @param - /medico/:id
 */

router.get("/:id", auth, async (req, res) => {
    try {
      // auth garantirá que foi enviado o token.
      const medico = await Medico.findById(req.params.id);
      res.json(medico);
    } catch (e) {
      res.send({ mensagem: `Erro ao obter os dados do médico: ${e.message}` });
    }
  });
  


//Inclui um novo médico
router.post("/novo",
[
    check("nome", "Informe o nome do médico").not().isEmpty(),
],
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const{nome, idade, cidade, uf, especialidade, avatar, stars} = req.body
        try{
            medico = new Medico(req.body)
            medico.avatar = 'https://source.unsplash.com/featured/?medic,'+nome
            medico.stars = 2.5
            await medico.save()
            res.send(medico)
        } catch (err){
            return res.status(500).json({
                errors: `Erro ao salvar o médico: ${err.message}`
            })
        }
})


//Atualizar informações de um médico específico
/**
 * @method - PUT
 * @description - Atualiza informações de um determinado médico
 * @param - /medico/put/:id
 */

router.get("/put/:id", auth, async (req, res) => {
    try {
      // auth garantirá que foi enviado o token.
      const medico = await Medico.findById(req.params.id);
      res.json(medico);
    } catch (e) {
      res.send({ mensagem: `Erro ao obter os dados do médico: ${e.message}` });
    }
  });


//Deletar de um médico específico
/**
 * @method - DELETE
 * @description - Deleta um determinado médico
 * @param - /medico/delete/:id
 */

router.delete("/delete/:id", auth, async (req, res) => {
    try {
      // auth garantirá que foi enviado o token.
      const medico = await Medico.deleteOne({_id: req.params.id});
      res.json(medico);
    } catch (e) {
      res.send({ mensagem: `Erro ao deletar médico: ${e.message}` });
    }
  });


module.exports = router