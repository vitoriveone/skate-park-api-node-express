export default class Skater {
    //TODO terminar clase skater
    constructor(id, email, nombre, password, anios_experiencia, foto, estado){
         this._id = id || null;
         this._email = email;
         this._nombre = nombre;
         this._password = password;
         this._anios_experiencia = anios_experiencia;
         this._foto = foto;
         this._estado = estado || false;
    }
    //TODO metodo que devuelve en objeto json.

    static builderBase(email, nombre, password, anos_experiencia, especialidad, foto) {
        return new Persona(null , email, nombre, password, anos_experiencia, especialidad, foto, false);
    }



    get estado(){
        return this._estado;
    }

    set estado(estado){
        this._estado = estado;
    }

}