const { Router } = require('express');
const router = Router();

const User = require('../models/users');

const jwt = require('jsonwebtoken');


router.get('/', (req,res) => res.send('hello world'));

router.post('/signup', async (req, res) => {
    //obtenemos los datos de la peticion
    const { email, password } = req.body;

    const newUser = new User({email, password});

    //como el metodo save es asincrono se le agrega await y async a la peticion
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, 'secretkey');
    res.status(200).json({ token });
    
});

module.exports = router;