import JWT from 'jsonwebtoken';

//protected Routed token base
//middleware ->  after req then , next validate and then moves to res
export const requireSignIn = async (req,res,next) => {   
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }
};