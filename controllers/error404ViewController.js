const getRoot404 = (req, res) => {
    try{
        res.render('./errors/404',{
            layout: 'main'
        });
    }catch(err){
        //TODO los errores pueden tener su propio layout.
        res.status(500)
            .render('./errors/500',{
                layout: 'main',
                error: err
            });
        }
}
export {
    getRoot404
}