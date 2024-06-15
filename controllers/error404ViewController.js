const getRoot404 = (req, res) => {
    try{
        res.status(404)
            .render('./errors/error',{
                layout: 'errorBase',
                title: '404',
                message: 'Página no encontrada'
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
export {
    getRoot404
}