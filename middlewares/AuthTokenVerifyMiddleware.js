export const verifyTokenMiddleware = (req, res, next) => { 
    console.log('Auth');
    next();
}