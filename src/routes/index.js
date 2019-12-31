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

    //al registrarse obtenemos el token
    const token = jwt.sign({ _id: newUser._id }, 'secretkey');
    res.status(200).json({ token }); 
});


// to sign in: get the token
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

//rutas para devolver datos publicos
router.get('/tasks', (req,res) => {
    res.json([
        {
        _id: 1,
        name: 'Task one',
        description: 'Lorem ipsum',
        date: "2019-12-31T19:48:28.315Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'Lorem ipsum',
            date: "2019-12-31T19:48:28.315Z"
            },
            {
                _id: 3,
                name: 'Task three',
                description: 'Lorem ipsum',
                date: "2019-12-31T19:48:28.315Z"
                },
    ]);
});


//ruta para datos privados
router.get('/private-tasks', verifyToken, (req,res) => {
    res.json([
        {
        _id: 01,
        name: 'private one',
        description: 'Lorem ipsum',
        date: "2019-12-31T19:48:28.315Z"
        },
        {
            _id: 02,
            name: 'private two',
            description: 'Lorem ipsum',
            date: "2019-12-31T19:48:28.315Z"
            },
            {
                _id: 03,
                name: 'private three',
                description: 'Lorem ipsum',
                date: "2019-12-31T19:48:28.315Z"
                },
    ]);
});









//funcion de validacion del token
function verifyToken( req, res, next) {

    //si no existen los headers
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized request");
    }
    //Si viene una cabecera pero
    //comprobemos el token
    const token = req.headers.authorization.split(' ')[1];
    if(token === null){
        return res.status(401).send("Unauthorized request");
    }

    const payload = jwt.verify(token, 'secretkey');
    console.log(payload);

    req.userId = payload._id;
    next();
}

module.exports = router;