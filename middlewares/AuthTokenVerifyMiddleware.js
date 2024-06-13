import jwt from "jsonwebtoken";
import {isAuthenticated} from '../service/AuthServiceProvider.js'

export const verifyTokenCookieMiddleware = async (req, res, next) => { 
    //const token = req.cookies.token;
    const cookie = req.cookies.token;
    if(!cookie){
        return res.status(401)
        .render('./errors/500',{
            layout: 'error',
            title: '401',
            message: 'Acceso no autorizado.',
            error: '',

        });
    }
    const [token, id] = cookie.split(':');

    if (!token&&!id) {
        //TODO redirecciona a error 401 resl layout partial
        return res.status(401)
        .render('./errors/500',{
            layout: 'error',
            title: '401',
            message: 'Acceso no autorizado.',
            error: '',

        });
    }
        
        //TODO dejar todos los error al mismo layput que cambie solo el titulo y el n de error.
    try {

        const skater = await isAuthenticated(token, id);

        if(!skater.estado){
            return res.status(401)
            .render('./errors/500',{
                layout: 'error',
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
        .render('./errors/500',{
            layout: 'error',
            title: '500',
            message:'Acceso no autorizado.',
            error: ''
        });
    }
}

export const verifyTokenMiddleware = (req, res, next) => { 

    next();
}