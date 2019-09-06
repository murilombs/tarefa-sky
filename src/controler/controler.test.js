const controlers = require("./controler");
const test = require("tape");
const superTest = require("supertest");
const express = require('express');

var app = express()

function testes() {
    test("Controlers function GetByID", (t) => {
        superTest(app)
        .get()
    })
}
