const getRootAdminStatus = (req, res) => {
    try{
        res.render('status',{
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
    getRootAdminStatus
}