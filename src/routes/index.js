const express = require ('express');
const router = express.Router();
const admin = require('firebase-admin');


var ServiceAccount = require("../../nodejs-primerejemplo-firebase-adminsdk-6n9k8-81cb0001a2.json");
const { app } = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
    databaseURL:'https://nodejs-primerejemplo-default-rtdb.firebaseio.com/'
});

const db = admin.database();


router.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/index.html')); esto es para HTML
    
    res.render('index.html', {title : 'First Website'});
});


router.get('/about', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/index.html')); esto es para HTML
    
    res.render('about.html', {title : 'Pagina en construcción'});
});

router.get('/contact', (req, res) => {
    //console.log(snapshot);
    db.ref('Contactos').once('value', (snapshot)=>{
        const data = snapshot.val();
        //console.log("data=>",data);
        res.render('contact.html', {title: 'Contact Page. peticion post', contactos: data});
    });
});

router.post('/new-contact', (req, res) => {
    const newContact = {
        email: req.body.email,
        mensaje: req.body.mensaje,
        calificacion: req.body.calificacion,
        edad: req.body.edad
    }
    //console.log(req.body);
    db.ref('Contactos').push(newContact);
    res.redirect('/contact');
});


router.get('/deleteContact/:id', (req, res) => {
    //console.log("id =>", req.params.id);
    db.ref('Contactos/'+req.params.id).remove()
    res.redirect('/contact');
});

router.post('/editContact', async (req, res) => {
    try {
        //console.log(req, req.body.id));
        const elemento =db.ref('Contactos/'+req.body.id);
        //console.log("elemnt =>",elemento);
        await elemento.update({
            email: req.body.email,
            edad: req.body.edad,
            mensaje: req.body.mensaje,
            calificacion: req.body.calificacion
        });
        res.redirect('/contact');
    } catch (error) {
        console.log("error", error);
        return res.status(500).json( error);
    }
});


router.get('/formToEdit/:id/:email/:mensaje/:calificacion/:edad', (req, res) => {

    //console.log("id =>", req.params);
    res.render('formToEdit.html', {title: 'Pagina de edicion de Contactos.', id: req.params.id,
    email: req.params.email,
    mensaje: req.params.mensaje,
    calificacion: req.params.calificacion,
    edad: req.params.edad});
});

module.exports = router;