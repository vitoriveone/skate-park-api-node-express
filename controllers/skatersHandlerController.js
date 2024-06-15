import { updateSkater, deleteSkater, findSkater, updateSkaterStatus } from '../service/SkaterService.js';
import { ApiResponseModel } from '../models/ApiResponseModel.js'
import SkaterMutator from '../utilities/skaterMutator.js'
import { removeFileAvatar } from '../service/ImagesUploadService.js'

const putSkaterStatusUpdate = async (req, res) => {
    const { id } = req.body;

    if (typeof id !== 'string') {
        res.json(new ApiResponseModel(ApiResponseModel.ERROR,
            400,
            [],
            'Error en la solicitud: faltan datos.'
        ));
    } else {
        try {
            const { rows } = await findSkater(id);
            const estado = rows[0].estado;
            const response = await updateSkaterStatus(id, !estado);
            const apiResponse = new ApiResponseModel(
                ApiResponseModel.SUCCESS,
                200,
                SkaterMutator.mutarSkater(response.rows[0]),
                'OK');
            res.json(apiResponse.toJSON()).status(apiResponse.statusCode);
        } catch (err) {
            console.log(err)
            res.json(new ApiResponseModel(ApiResponseModel.ERROR,
                500,
                [],
                'Error Desconocido.',
                err.stack));
        }
    }

}

const deleteSkaterDestroy = async (req, res) => {
    const id = req.query.id
    if (typeof id !== 'string') {
        res.json(new ApiResponseModel(ApiResponseModel.ERROR,
            400,
            [],
            'Error en la solicitud: faltan datos.'
        ));
    } else {
        try {
            const response = await deleteSkater(id);
            const foto_name = response.rows[0].foto;
            const result = await removeFileAvatar(foto_name);
            console.log(result);

            const apiResponse = new ApiResponseModel(
                ApiResponseModel.SUCCESS,
                200,
                SkaterMutator.mutarSkater(response.rows[0]),
                'OK');
            res.json(apiResponse.toJSON()).status(apiResponse.statusCode);
        } catch (err) {
            res.json(new ApiResponseModel(ApiResponseModel.ERROR,
                500,
                [],
                'Error Desconocido.',
                err.stack));
        }
    }

}

const putSkaterUpdate = async (req, res) => {
    const { id, nombre, password, anos_experiencia, especialidad } = req.body;
    console.log(id, nombre, password, anos_experiencia, especialidad);
    if (typeof id !== 'string' || typeof nombre !== 'string' || typeof password !== 'string' || typeof anos_experiencia !== 'string' || typeof especialidad !== 'string') {
        res.json(new ApiResponseModel(ApiResponseModel.ERROR,
            400,
            [],
            'Error en la solicitud: faltan datos.'
        ));
    } else {
        try {
            const response = await updateSkater({ id, nombre, password, anos_experiencia, especialidad });
            res.json(response.toJSON()).status(response.statusCode);
        } catch (err) {
            res.json(new ApiResponseModel(ApiResponseModel.ERROR,
                500,
                [],
                'Error Desconocido.',
                err.stack)
            );
        }
    }
}

export {
    putSkaterStatusUpdate,
    deleteSkaterDestroy,
    putSkaterUpdate
}