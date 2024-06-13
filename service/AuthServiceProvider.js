import {selectSkaters, findSkater} from './SkaterService.js'
import SkaterMutator from'../utilities/skaterMutator.js'
import jwt from "jsonwebtoken";
const SECRET_KEY = "Mi Llave Ultra Secreta";

const authUser = async (email, password) => {
    try{
    const result = await selectSkaters();
    const skaters = result.rows;

    const skater = skaters.find((u) => u.email === email && u.password === password);

    if (skater) {
        const tokenGen = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 180,
                data: skater,
            },
            SECRET_KEY
        );
        
        return SkaterMutator.mutarSkaterAuth(skater,tokenGen);
    } else {
        return null;
    }
    }catch(err){
        return null;
    }
};

const isAuthenticated = async (token, id) => {
    try{
        const { rows } = await findSkater(id);
        const user = rows[0];

        if(!user&&!token){
            return null;
        }

        let response;
        jwt.verify( token, SECRET_KEY, ( err, decoded )=> {
            response = decoded;
        })

        return user;
    }catch(err){
        throw new Error(`Error al ejecutar la consulta: ${err.message} código de error: ${err.code} Detalles del error: ${err.detail}`);
    }

}



export { authUser, isAuthenticated };