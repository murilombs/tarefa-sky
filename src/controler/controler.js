const repository = require("../repository/repository");
const isValidEmail = require("../utils/Email-validation").isValidEmail;
const passwordHash = require("../utils/password").passwordHash;
const checkPassword = require("../utils/password").checkPassword;
const generateToken = require("../auth/autentification").generateToken;
const toObjectId = require("mongodb").ObjectId;
const mongoose = require('mongoose');
const User = mongoose.model("Users");

exports.getUser = async(req, res, next) => {
    var id = toObjectId(req.params.id);
    try {
        User.findById({_id: id}, (err, user) => { 
            res.status(201).json(user) 
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'Erro',
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.login = (req, res, next) => {
    try {
        User.findOne({email: req.body.email}, (err, user) => {
            checkPassword(req.body.senha, user.senha).then(check => {
                if (check == true) {
                    res.status(201).json(user)
                } else {
                    res.status(401).json({mensagem: "Usuário e/ou senha inválidos"})
                }
            })
        })
    } catch (error) {
        console.log(error);
    }
}

exports.newUser = (req, res, next) => {
    try {
        isValidEmail(req.body.email, err => {
            if (err) {
                res.status(400).json({mensagem: err.message})
            } else {
                const token = generateToken({
                    email: req.body.email,
                    nome: req.body.nome,
                });

                repository.saveNewUser({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: passwordHash(req.body.senha),
                    telefones: req.body.telefones,
                    token: token
                }, (err, user) => {
                    res.status(201).json(user);
                }); 
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.updateUser = (req, res, next) => {
    try {
        repository.updateUserByID(req.params.id, req.body.name, (err, user) => {
            res.status(201).json(user);
        })
    } catch (error) {
        console.log(error);
    }
}