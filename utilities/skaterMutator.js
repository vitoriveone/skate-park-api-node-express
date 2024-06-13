export default class SkaterMutator {
    constructor(){

    }
    //FIXME invertir las propiedades

    //Formatea para objeto login Auth
    static mutarSkaterAuth(skater, token) {
        delete skater.password;
        delete skater.estado;
        delete skater.fecha_creacion;
        skater.token = token; 
        return skater;
    }

    //Formatea objeto para get
    static mutarSkater(skater) {
        delete skater.password;
        delete skater.estado;
        delete skater.fecha_creacion;
        return skater;
    }

    //Formatea array para get admin api
    static mutarSkaters(skaters){
        skaters.forEach(skater => {
            delete skater.password;
            //delete skater.estado;
            delete skater.fecha_creacion;
        });
        return skaters;
    }

    //Formatea array para get publico
    static mutarSkatersBasic(skaters){
        skaters.forEach(skater => {
            delete skater.id;
            delete skater.email;
            delete skater.password;
            delete skater.fecha_creacion;
        });
        return skaters;
    }
}