const express = require("express");
const router = express.Router();
const controlers = require("../controler/controler");
const authorize = require("../auth/autentification");

router.get("/:id", authorize.authorizeToken, controlers.getUser); // pega user pelo id
router.post("/", controlers.newUser); // cria novo user
router.get("/", controlers.login); // Login
router.put("/:id", authorize.authorizeToken, controlers.updateUser); // atualiza os dados

module.exports = router;
