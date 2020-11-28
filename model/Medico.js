//CSpell: ignore
const mongoose = require('mongoose')

//Criamos o schema Medico
const MedicoSchema = mongoose.Schema({
    nome: {
        type: String,
        minlength: [2, 'O nome é muito curto'],
        maxlength: [100, 'O nome é muito longo'],
        required: [true, 'O nome do profissional é obrigatório']
    },
    idade: {type: Number},
    cidade: {type: String},
    uf: {type: String},
    especialidade: {type: String},
    stars: { type: Number, min: 0, max: 5 },
    avatar: {
        type: String,
        maxlength: [1000, 'A URL da imagem é muito longa'],
        required: false
    }
},
{timestamps: true})

module.exports = mongoose.model('medico',MedicoSchema)