    const getRootHome = (req, res) => {
        try{
            res.render('home',{
                layout: 'main'
            });
        }catch(err){
            res.status(500)
                .render('home',{
                    layout: 'main',
                    error: err
                });
            }
    }
    export {
        getRootHome
    }