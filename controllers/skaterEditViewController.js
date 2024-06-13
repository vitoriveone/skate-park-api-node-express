const getRootSkaterEdit = (req, res) => {
    try{
        res.render('edit',{
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
    getRootSkaterEdit
}