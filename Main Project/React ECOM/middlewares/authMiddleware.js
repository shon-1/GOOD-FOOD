import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//protected Routed token base
//middleware ->  after req then , next validate and then moves to res
export const requireSignIn = async (req,res,next) => {   
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET   //Encrypt
        );
        req.user = decode;  //Decrypt
        next();
    } catch (error) {
        console.log(error)
    }
};

//admin access
export const isAdmin = async (req,res,next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role != 1){
            return res.status (401).send({
                success:false,
                message:'UnAuthorised Access'
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            message:'Error in admin middileware'
        })
        
    }
}


//Delivery access
export const isDelivery = async (req,res,next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role == 2){
            next();
        } else {
            return res.status (401).send({
                success:false,
                message:'UnAuthorised Access'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            message:'Error in admin middileware'
        })
        
    }
}