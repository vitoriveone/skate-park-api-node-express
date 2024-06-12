import express from 'express';
import { create } from 'express-handlebars';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

import homeRoute from '../routes/v1/homeRoute.routes.js';

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8000;
        this.frontEndPaths = {
            rootHome: '/',
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
    };

    routes(){
        this.app.use(this.frontEndPaths.rootHome, homeRoute);
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