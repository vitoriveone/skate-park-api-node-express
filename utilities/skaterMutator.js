export default class SkaterMutator {
    constructor(){

    }
    //TODO tengo que agregar un mutator para get skaters sin ID para no autorizados.
    static mutarSkater(skater) {
        delete skater.password;
        delete skater.estado;
        delete skater.fecha_creacion;
        return skater;
    }

    static mutarSkaters(skaters){
        skaters.forEach(skater => {
            delete skater.password;
            //delete skater.estado;
            delete skater.fecha_creacion;
        });
        return skaters;
    }
}