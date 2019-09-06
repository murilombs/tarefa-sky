const toObjectId = require("mongodb").ObjectId;
const mongoose = require('mongoose');
const User = mongoose.model("Users");

exports.saveNewUser = (data, callback) => {
    const user = new User(data)
    user.save(callback);
}

exports.updateUserByID = (id, update, callback) => {
    const user_id = toObjectId(id);
    User.findOneAndUpdate({_id: user_id}, { 
        $set: {
            nome: update.nome,
            ultimo_login: new Date()
        }
    }, callback)
}
