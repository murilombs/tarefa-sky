const mongoose = require('mongoose');
const User = mongoose.model("Users");

//valida o e-mail
exports.isValidEmail = function (email, cb) {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    let naoAutorizada = "E-mail invalido";
    let jaExiste = "E-mail já existente";
    if (!reg.test(email)) {
        cb(new Error(naoAutorizada))
        return
    }
    User.findOne({ email: email }, (err, res) => {
        if (res && res.email === email) {
            cb(new Error(jaExiste));
        }
        else {
            cb(null);
        }
    })
};
