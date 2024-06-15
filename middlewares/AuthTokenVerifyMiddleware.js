import jwt from "jsonwebtoken";
import {isAuthenticated} from '../service/AuthServiceProvider.js'

export const verifyTokenCookieMiddleware = async (req, res, next) => { 
    //const token = req.cookies.token;
    const cookie = req.cookies.token;
    if(!cookie){
        return res.status(401)
        .render('./errors/error',{
            layout: 'errorBase',
            title: '401',
            message: 'Acceso no autorizado.',
            error: '',

        });
    }
    const [token, id] = cookie.split(':');

    if (!token&&!id) {
        return  res.status(401)
        .render('./errors/error',{
            layout: 'errorBase',
            title: '401',
            message: 'Acceso no autorizado.',
            error: '',

        });
    }
        
    try {

        const skater = await isAuthenticated(token, id);

        if(!skater.estado){
            return es.status(401)
            .render('./errors/error',{
                layout: 'errorBase',
                title: '401',
                message: `Bienvenido ${skater.nombre}, su acceso todavía no  ha sido autorizado.`,
                error: '',
                login: true
            });
        }

        next();
    } catch (err) {
        console.error(err);
        return res.status(401)
        .render('./errors/error',{
            layout: 'errorBase',
            title: '500',
            message:'Acceso no autorizado.',
            error: ''
        });
    }
}

export const verifyTokenMiddleware = (req, res, next) => { 

    
    next();
}