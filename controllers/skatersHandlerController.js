import { insertSkater, selectSkaters, updateSkater, deleteSkater, findSkater, updateSkaterStatus } from '../service/SkaterService.js';
import {ApiResponseModel} from '../models/ApiResponseModel.js'
//import SkaterMutator from'../utilities/skaterMutator.js'

const putSkaterStatusUpdate = async (req, res) => {
    const {id} = req.body;

    if(typeof id !== 'string'){
        res.json(new ApiResponseModel(ApiResponseModel.ERROR,
            400, 
            [],
            'Error en la solicitud: faltan datos.'
        ));
    }else{
        try{
            const {rows} = await findSkater(id);
            const estado = rows[0].estado;
            const response = await updateSkaterStatus(id, !estado);

                res.json(response.rows[0]).status(200);
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

export {
    putSkaterStatusUpdate,
    deleteSkaterDestroy
}