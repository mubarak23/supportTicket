const express = require('express')
const { profile, registerUser, loginUser} = require('../controllers/userController')
const { protected } = require('../middleware/authMiddlware')
const router = express.Router()

router.post('/', registerUser)

router.post("/login", loginUser);

router.get("/me", protected, profile);

module.exports = router