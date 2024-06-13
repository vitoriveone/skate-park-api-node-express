
import { insertSkater, selectSkaters, updateSkater, deleteSkater, findSkater, updateSkaterStatus } from '../service/SkaterService.js';
import {ApiResponseModel} from '../models/ApiResponseModel.js'

//TODO status code 201,, Revisar bien los ccódigos de estado.
const postSkaterCreate = async (req, res) => {
    const {email, nombre, password, anos_experiencia, especialidad, foto} = req.body;
    const response = await insertSkater({email, nombre, password, anos_experiencia, especialidad, foto});
    res.json(response.toJSON()).status(response.statusCode);
    /*
    if(typeof nombre !== 'string' || typeof balance !== 'string'){
        res.json(new ApiResponseModel(ApiResponseModel.ERROR,
            400, 
            [],
            'Error en la solicitud: faltan datos.'
        ));
    }else{
        try {

        }catch(err){
            res.json(new ApiResponseModel(ApiResponseModel.ERROR,
                500, 
                [],
                'Error Desconocido.',
                err.stack));
        }
    }*/

}


const getSkatersAll = async (req, res) => {
    try{
        const response = await selectSkaters();
        res.json(response.toJSON()).status(response.statusCode);
    }catch(err){
        res.json(new ApiResponseModel(ApiResponseModel.ERROR,
            500, 
            [],
            'Error Desconocido.',
            err.stack));
    }
}

const putSkaterEdit = async (req, res) =>{
    const { id, nombre, password , anos_experiencia, especialidad} = req.body;
    console.log(id, nombre, password , anos_experiencia, especialidad, estado);
    if(typeof id !== 'string' || typeof nombre !== 'string'|| typeof password !== 'string'|| typeof anos_experiencia !== 'string'|| typeof especialidad !== 'string'){
        res.json(new ApiResponseModel(ApiResponseModel.ERROR,
            400, 
            [],
            'Error en la solicitud: faltan datos.'
        ));
    }else{
        try{
            const response = await updateSkater({id, nombre, password , anos_experiencia, especialidad});
                res.json(response.toJSON()).status(response.statusCode);
            }catch(err){
                res.json(new ApiResponseModel(ApiResponseModel.ERROR,
                    500, 
                    [],
                    'Error Desconocido.',
                    err.stack)
                );
            }
    }
}

const putSkaterStatusUpdate = async (req, res) => {
    const {id, estado} = req.body;
    if(typeof id !== 'string'||typeof estado !== 'boolean'){
        res.json(new ApiResponseModel(ApiResponseModel.ERROR,
            400, 
            [],
            'Error en la solicitud: faltan datos.'
        ));
    }else{
        try{
            const response = await updateSkaterStatus(id, estado);
                res.json(response.toJSON()).status(response.statusCode);
            }catch(err){
                res.json(new ApiResponseModel(ApiResponseModel.ERROR,
                    500, 
                    [],
                    'Error Desconocido.',
                    err.stack));
            }
    }

}

const deleteSkaterDestroy = async (req, res) => {
    const {id} = req.body;
    if(typeof id !== 'string'){
        res.json(new ApiResponseModel(ApiResponseModel.ERROR,
            400, 
            [],
            'Error en la solicitud: faltan datos.'
        ));
    }else{
        try{
            const response = await deleteSkater(id);
                res.json(response.toJSON()).status(response.statusCode);
            }catch(err){
                res.json(new ApiResponseModel(ApiResponseModel.ERROR,
                    500, 
                    [],
                    'Error Desconocido.',
                    err.stack));
            }
    }

}

const getSkaterFind = async (req, res) => {
    const  id  = req.query.id;
    if(typeof id !== 'string'){
        res.json(new ApiResponseModel(ApiResponseModel.ERROR,
            400, 
            [],
            'Error en la solicitud: faltan datos.'
        ));
    }else{
        try{
            const response = await findSkater(id);
            res.json(response.toJSON()).status(response.statusCode);
        }catch(err){
            res.json(new ApiResponseModel(ApiResponseModel.ERROR,
                500, 
                [],
                'Error Desconocido.',
                err.stack)
            );
        }
    }

}


/*
import { 
    insertUsuario,
    getUsuarios,
    deleteUsuario,
    findUsuario,
    updateUsuario } from '../models/UsuarioService.js';
    import {ApiResponseModel} from '../models/ApiResponseModel.js'





}







export {
    postUsuarioCreate,
    putUsuarioEdit,
    deleteUsuarioDestroy,
    getUsuariosAll,
    getUsuarioFind
}
    */

export {
    postSkaterCreate,
    getSkatersAll,
    putSkaterEdit,
    deleteSkaterDestroy,
    getSkaterFind,
    putSkaterStatusUpdate
}