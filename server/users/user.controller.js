const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/login', login);
router.post('/sign-up', signUp);
router.get('/verify-email', verifyEmail);
router.get('/', (req, res, next) => res.json({ "you": "logged in" }));

module.exports = router;

function login(req, res, next) {
    userService.login(req.body)
        .then((user) => user ? res.json(user) : res.status(400).json({ message: "error" }))
        .catch(err => next(err));
}

function signUp(req, res, next) {
    userService.signUp(req.body)
        .then((body) => {
            if (body.message == "success") {
                res.json(body)
            } else {
                res.status(400).json({ message: "error" })
            }
        })
        .catch(err => next(err));
}

function verifyEmail(req, res, next) {
    userService.verifyEmail(req.query)
        .then((body) => {
            if (body.message == "success") {
                res.send(body.body)
            } else {
                res.status(400).json({ message: "error" })
            }
        })
        .catch(err => next(err));
}