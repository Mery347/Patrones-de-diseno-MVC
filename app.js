const express = require('express');
const livereload =require('livereload');
const path = require('path');

const connectLivereload =require('connect-livereload');
const liveReloadServer = livereload.createServer();
const app = express();
const port = 3000;

/*Rutas*/
const mainRouter = require('./routers/main');

/*view engine setup*/
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));
liveReloadServer.watch(path.join(__dirname,'public'));
app.use(connectLivereload());

app.use('/',mainRouter);

//app.get('/',(req,res) => res.sendFile(path.join(__dirname,'views','home.html')));
//app.get('/about',(req,res) => res.sendFile(path.join(__dirname,'views','about.html')));


liveReloadServer.server.once('connection',()=>{
    setTimeout(()=>{
        liveReloadServer.refresh('/')
    },50);
})


app.listen(port,() => console.log(`Servidor levantado en http://localhost ${port}`));

