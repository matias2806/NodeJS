const express = require ('express');
const app = express();
const path = require('path');

//settings
app.set('appName', 'Matias Palmieri NodeJS Quares');
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views')); //esto para trabajar con ejs y le marcas donde van a estar tus views
app.engine('html', require('ejs').renderFile); //Aca le digo que quiero trabajar con archivos HTML pero que se procesen con ejs osea voy a mantener lo que me brinda ejs
app.set('view engine', 'ejs'); //esto es para aclarar que vas a trabajar con ejs


//midlewares
app.use(express.json());

//routes
app.use(require('./routes/'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//listening the server
app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('Server on port', app.get('port'), 'Visit => http://localhost:3000/');
})

