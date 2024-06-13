const getRootRegister = (req, res) => {
    try{
        res.render('register',{
            layout: 'main'
        });
    }catch(err){
        res.status(500)
            .render('./errors/500',{
                layout: 'main',
                error: err
            });
        }
}
export {
    getRootRegister
}