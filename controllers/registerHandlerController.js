import { insertSkater } from '../service/SkaterService.js';
import { ApiResponseModel } from '../models/ApiResponseModel.js'
import SkaterMutator from '../utilities/skaterMutator.js'
import { saveFileAvatar } from '../service/ImagesUploadService.js'

const getRegisterView = async (req, res) => {
    try {
        res.render('register', {
            layout: 'main',
            title: 'Registro'
        });
    } catch (err) {
        res.status(500)
            .render('./errors/error', {
                layout: 'errorBase',
                title: '500',
                message: 'Error',
                error: err
            });
    }
}


const postRegisterSkater = async (req, res) => {

    const { email, nombre, password, anos_experiencia, especialidad } = req.body;
    let foto = req.files.foto;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Ningun archivo fue cargado.');
    }

    try {
        const fotoName = saveFileAvatar(foto);
        const response = await insertSkater({ email, nombre, password, anos_experiencia, especialidad, fotoName });

        const apiResponse = new ApiResponseModel(
            ApiResponseModel.SUCCESS,
            201,
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

export {
    getRegisterView,
    postRegisterSkater
}