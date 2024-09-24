const express = require('express');
const morgan = require('morgan');

const app = express();
app.set('port', 3001);
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.listen(app.get('port'), () => {
    console.log('Servidor Iniciado en el puerto', + app.get('port'));
});

