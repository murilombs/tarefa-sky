const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    senha: {
        type: String
    },
    telefones: {
        type: Object
    },
    token: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema);
