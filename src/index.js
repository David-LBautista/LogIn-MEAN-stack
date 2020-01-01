const express = require('express');
const app = express();
const cors = require('cors');


// database
require('./database');

app.use(express.json());

//esta es para decirle a mi servidor que se puede comunicar con otros servidores
app.use(cors());

//routes
app.use('/api',require('./routes/index'));



app.listen(3000);
console.log('Server on port', 3000);