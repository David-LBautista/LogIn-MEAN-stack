const { Router } = require('express');
const router = Router();

const User = require('../models/users');

const jwt = require('jsonwebtoken');


router.get('/', (req,res) => res.send('hello world'));

// porceso de REGISTRO
router.post('/signup', async (req, res) => {
    //obtenemos los datos de la peticion
    const { email, password } = req.body;

    const newUser = new User({email, password});

    //como el metodo save es asincrono se le agrega await y async a la peticion
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, 'secretkey');
    res.status(200).json({ token }); 
});

router.post('/signin', async (req,res) => {

    const { email, password } = req.body;
    const user = await User.findOne({email});

    //si no existe el usuario retornar estatus 401
    if(!user) return res.status(401).send('The email doesnt exists');
    //si la contraseña del usuario no es igual a la de la base de datos
    if(user.password !== password) return res.status(401).send("Wrong password");

    const token = jwt.sign({_id: user._id}, 'secretkey');
     res.status(200).json({token});

});

module.exports = router;