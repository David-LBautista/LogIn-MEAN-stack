const express = require('express');
const app = express();


// database
require('./database');

app.use(express.json());

//routes
app.use('/api',require('./routes/index'));



app.listen(3000);
console.log('Server on port', 3000);