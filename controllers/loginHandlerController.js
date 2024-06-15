import Server from '../models/Server.js';
import {authUser} from '../service/AuthServiceProvider.js'
import {ApiResponseModel} from '../models/ApiResponseModel.js'



const getLoginView = async (req, res) => {
    try{
        res.render('login',{
            layout: 'main',
            title: 'Iniciar Sesión',
            url: Server.URL
        });
    }catch(err){
        res.status(500)
            .render('./errors/error',{
                layout: 'errorBase',
                title: '500',
                message: 'Error',
                error: err
            });
        }
}

const putLoginAuth = async (req, res) => {
    const { email, password } = req.body;
    try {
    const auth = await authUser(email, password);

    if(auth){
        const apiResponse = new ApiResponseModel(
            ApiResponseModel.SUCCESS,
            200, 
            auth,
            'OK');
        res.cookie('token',`${auth.token}:${auth.id}`, { httpOnly: true });
        res.json(apiResponse.toJSON()).status(apiResponse.statusCode);
    }else{
        res.send(new ApiResponseModel(
            ApiResponseModel.FAIL, 404, [],'No se encontro el usuario.', ''
        ));
    }}catch(error){
        res.json(new ApiResponseModel(ApiResponseModel.ERROR,
            500, 
            [],
            'Error Desconocido.',
            err.stack));
    }
}

const putLogOut = async(req, res)  => {
    res.clearCookie('token');
    res.redirect('/login');
}

export {
    getLoginView,
    putLoginAuth,
    putLogOut
}