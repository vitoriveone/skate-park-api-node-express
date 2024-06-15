import express from 'express';
import { create } from 'express-handlebars';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

import skaterHomeRoutes from '../routes/v1/skaterRoutes.routes.js';
import loginRoute from '../routes/v1/loginRoutes.routes.js';
import registerRoute from '../routes/v1/registerRoutes.routes.js';
import adminSkaterRouteAPI from '../routes/v1/apiSkaterRoutes.routes.js';
import adminSkatersRoute from '../routes/v1/adminSkatersRoutes.routes.js';
import adminSkaterViewRoutes from '../routes/v1/adminSkaterRoutes.routes.js';

import {verifyTokenMiddleware , verifyTokenCookieMiddleware} from '../middlewares/AuthTokenVerifyMiddleware.js'
import error404Routes from '../routes/v1/error404Routes.routes.js';

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8000;
        this.frontEnd = {
            rootHome: '/',
            rootLogin: '/login',
            rootRegister: '/register',
            root404: '*'
        };
        this.frontEndAdmin = {
            admin:{
                skaters: '/admin/skaters',
                skater: '/admin/skater'
            }
        };
        this.backEndApi = {
            v1:{
                skater: '/api/v1/skater',
                skaters: '/api/v1/skaters',
            }
        };
        this.middlewares();
        this.routes();
    }
    
    static URL = `http://localhost:${(process.env.PORT || 8000)}`;

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        //FIXME a config
        this.app.use(fileUpload({
                limits:{ fileSize: 3000000 }, //3MB
                abortOnLimit :true,
                //TODO mostrar como alerta
                responseOnLimit : "Ha superado el límite de 3MB por imagen."
            }))
        this.app.use(express.static('public'));
        this.app.use('/css', express.static(`${__dirname}/../public/assets/css`));
        this.app.use('/js', express.static(`${__dirname}/../public/assets/js`));
        this.app.use('/img/avatar', express.static(`${__dirname}/../public/assets/img/avatar`));
        this.app.use('/bootstrap', express.static(`${__dirname}/../node_modules/bootstrap/dist/css`));
        this.app.use('/bootstrap', express.static(`${__dirname}/../node_modules/bootstrap/dist/js`));
        this.app.use('/jquery', express.static(`${__dirname}/../node_modules/jquery/dist`));
        this.app.use('/axios', express.static(__dirname + '/../node_modules/axios/dist'));

        //Middlewares
        this.app.use('/admin', verifyTokenCookieMiddleware);
    };

    routes(){
        this.app.use(this.frontEnd.rootHome, skaterHomeRoutes);
        this.app.use(this.frontEnd.rootLogin, loginRoute);
        this.app.use(this.frontEnd.rootRegister, registerRoute);
        this.app.use(this.frontEndAdmin.admin.skaters, adminSkatersRoute);
        this.app.use(this.backEndApi.v1.skater, adminSkaterRouteAPI);
        this.app.use(this.frontEndAdmin.admin.skater, adminSkaterViewRoutes);


        this.app.use(this.frontEnd.root404, error404Routes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

    initHandlebars(){
        this.hbs = create({
            partialsDir: [
                "views"
            ]
        });

        this.hbs.handlebars.registerHelper('incrementIndex', (index) => {
            return index + 1;
        });

        this.app.engine( "handlebars", this.hbs.engine );
        this.app.set("view engine","handlebars");
    }
};

export default Server;