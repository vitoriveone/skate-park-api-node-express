const getRootLogin = (req, res) => {
    try{
        res.render('login',{
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
    getRootLogin
}