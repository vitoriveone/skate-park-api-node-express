import express from 'express';
import { create } from 'express-handlebars';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

import homeRoute from '../routes/v1/homeRoutes.routes.js';
import loginRoute from '../routes/v1/loginRoutes.routes.js';
import registerRoute from '../routes/v1/registerRoutes.routes.js';
import adminStatusRoute from '../routes/v1/adminStatusRoutes.routes.js';
import adminEditSkaterRoute from '../routes/v1/adminSkaterRoutes.routes.js';
import error404Routes from '../routes/v1/error404Routes.routes.js';

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8000;
        //TODO Agregar otras variables
        this.frontEndPaths = {
            rootHome: '/',
            rootLogin: '/login',
            rootRegister: '/register',
            root404: '*'
        },
        this.frontEndAdminPaths = {
            rootAdminStatus: '/admin/status',
            rootAdminEdit: '/admin/skater'
        },
        this.backEndApi = {
            v1:{

            }
        },
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/css', express.static(`${__dirname}/../public/assets/css`));
        this.app.use('/js', express.static(`${__dirname}/../public/assets/js`));
        this.app.use('/bootstrap', express.static(`${__dirname}/../node_modules/bootstrap/dist/css`));
        this.app.use('/bootstrap', express.static(`${__dirname}/../node_modules/bootstrap/dist/js`));
        this.app.use('/jquery', express.static(`${__dirname}/../node_modules/jquery/dist`));
    };

    routes(){
        this.app.use(this.frontEndPaths.rootHome, homeRoute);
        this.app.use(this.frontEndPaths.rootLogin, loginRoute);
        this.app.use(this.frontEndPaths.rootRegister, registerRoute);
        this.app.use(this.frontEndAdminPaths.rootAdminStatus, adminStatusRoute);
        this.app.use(this.frontEndAdminPaths.rootAdminEdit, adminEditSkaterRoute);
        this.app.use(this.frontEndPaths.root404, error404Routes);
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

        this.app.engine( "handlebars", this.hbs.engine );
        this.app.set("view engine","handlebars");
    }
};

export default Server;