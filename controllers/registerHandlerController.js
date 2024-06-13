import { insertSkater } from '../service/SkaterService.js';
import {ApiResponseModel} from '../models/ApiResponseModel.js'
import SkaterMutator from'../utilities/skaterMutator.js'
import Server from '../models/Server.js';

const getRegisterView = async (req, res) => {
    try{
        res.render('register',{
            layout: 'main',
            title: 'Registro',
            url: Server.URL
        });
    }catch(err){
        res.status(500)
            .render('./errors/500',{
                layout: 'error',
                title: '500',
                message: 'Error',
                error: err
            });
        }
}

const postRegisterSkater = async (req, res) =>{
    const {email, nombre, password, anos_experiencia, especialidad, foto} = req.body;
        console.log(email, nombre, password, anos_experiencia, especialidad, foto);
    const response = await insertSkater({email, nombre, password, anos_experiencia, especialidad, foto});
    
    const apiResponse = new ApiResponseModel(
        ApiResponseModel.SUCCESS,
        201, 
        SkaterMutator.mutarSkater(response.rows[0]),
        'OK');
    res.json(apiResponse.toJSON()).status(apiResponse.statusCode);
}

export {
    getRegisterView,
    postRegisterSkater
}