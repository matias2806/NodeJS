const express = require ('express');
const router = express.Router();



router.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/index.html')); esto es para HTML
    res.render('index.html', {title : 'First Website'});
});

router.get('/contact', (req, res) => {
    res.render('contact.html', {title: 'Contact Page. peticion post'});
});


router.post('/formContact', (req, res) => {
    console.log(req.body);
    console.log(res.body );
    res.send('POST RECIBE');
});

router.put('/putContact/:id', (req, res) => {
    console.log(req.body);
    console.log(res.body );
    res.send(`PUT RECIBE \n\n Usuario modificado = ${req.params.id} \n  con el mail = ${req.body.mail} y el mensaje = ${req.body.mensaje}`);
});

router.delete('/deleteContact/:id', (req, res) => {
    console.log(req.body);
    console.log("id =>", req.params);
    res.send(`DELETE RECIBE \n\n User ${req.params.id} deleted`);
});

module.exports = router;