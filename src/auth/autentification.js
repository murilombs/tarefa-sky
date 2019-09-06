const jwt = require("jsonwebtoken");
const toObjectId = require("mongodb").ObjectId; 

const mongoose = require('mongoose');
const User = mongoose.model("Users");

exports.generateToken = (data) => {
    return jwt.sign(data, process.env.token_key, { expiresIn: '1d'});
}

exports.decodeToken = (token) => {
    var data = jwt.verify(token, process.env.token_key);
    return data;
}

exports.authorizeToken = (req, res, next) => {
    let token = req.headers['bearer'];
    User.findOne({_id: toObjectId(req.params.id)}, (err, user) => {
        if (!token) {
            res.status(401).json({
                message: 'Não autorizado'
            });
        } else {
            jwt.verify(token, process.env.token_key, function(error, decoded) {
                if (user.token != token) { res.status(401).json ({ meesage: 'Não autorizado' }); return }
                if (error) {
                    res.status(401).json ({
                        meesage: 'Não autorizado'
                    });
                } else {
                    next();
                }
            })
        }
    });
}

