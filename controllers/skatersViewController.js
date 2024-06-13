import Server from '../models/Server.js';
import {selectSkaters} from '../service/SkaterService.js'
import SkaterMutator from'../utilities/skaterMutator.js'

const getSkaterHome = async(req, res) => {
    //TODO agreagr paginador
    //const {paginator} = req.query;

    try{
        const skaters = await selectSkaters();
        
        res.render('home',{
            layout: 'main',
            title: 'Lista de participantes',
            skaters: SkaterMutator.mutarSkatersBasic(skaters.rows),
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

const getSkatersAdmin = async(req, res) => {
    //TODO agreagr paginador
    //const {paginator} = req.query;

    try{
        const skaters = await selectSkaters();
        
        res.render('./admin/home',{
            layout: 'main',
            title: 'Administración',
            skaters: SkaterMutator.mutarSkaters(skaters.rows),
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

const getSkaterAdminEdit = async(req, res) => {
    //TODO agreagr paginador
    //const {paginator} = req.query;

    try{
        
        
        res.render('./admin/home',{
            layout: 'main',
            title: 'Administración',
            skater: {},
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

export {
    getSkaterHome,
    getSkatersAdmin,
    getSkaterAdminEdit
}