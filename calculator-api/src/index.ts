import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "reflect-metadata";

require('dotenv').config()

// const sql = require("mssql");

const app = express();         
const port = process.env.PORT; //porta padrão
//const router = express.Router();


app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

var compression = require('compression');
var helmet = require('helmet');
app.use(compression());
app.use(helmet());

app.use(function (req, res, next) {
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
    next();
});

app.use(cors({
    exposedHeaders: ['token']
}));

//loga as variaveis de ambiente
const env = { 
    "DB_DRIVER" : process.env.DB_DRIVER
    , "DB_SERVER" : process.env.DB_SERVER
    , "DB_DATABASE": process.env.DB_DATABASE
    , "DB_USER" : process.env.DB_USER
    , 'THEME': process.env.THEME
    , 'LANGUAGE': process.env.LANGUAGE
};

app.use('/config', (req, res, next) => {
    res.status(200).send(env);
});

import appRouter from '../src/Routes'
app.use('/', appRouter);

console.table(env);
//inicia o servidor
app.listen(port);
console.log(`API funcionando na porta ${process.env.PORT}`);