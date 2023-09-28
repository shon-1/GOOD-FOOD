    import { comparePassword, hashPassword } from "../helpers/authHelper.js";
    import userModel from "../models/userModel.js";
    import JWT from 'jsonwebtoken';


    export const registerContoller = async (req,res) => {
        try {
            console.log("Received registration request #########");
            const {name,email,password,phone,address} = req.body
            //validation
            if(!name){
                return res.send({error: 'Name is Required'})
            }
                    
            if(!email){
                return res.send({message: 'email is Required'})
            }
                        
            if(!password){
                return res.send({message: 'Phone is Required'})
            }
            if(!phone){
                return res.send({message: 'email is Required'})
            }
                    
            if(!address){
                return res.send({message: 'address is Required'})
            }

            //check User
            const exsistingUser = await userModel.findOne({email:email})
            //Exsisting user ?
            if(exsistingUser){
                return res.status(200).send({
                    success:false,
                    message:'Alredy Registerd , please login',
                })
            }
            //register user
            const  hashedPassword =await hashPassword(password)
            if (!hashedPassword) {
                return res.status(500).send({
                    success: false,
                    message: 'Error in hashing password',
                });
            }
            
            //save
            const user = await new userModel({name,email,phone,address,password:hashedPassword}).save()

            res.status(201).send({
                success:true,
                message:'user Registration Successful',
                user,

            });
        } catch (error) {
            console.error("Error in registration: ########", error);
            console.log(error)
            res.status(500).send({
                success:false,
                messsage:'Error in Registration',
                error
            })
            
        }
    };

    //export default { registerContoller };

    //POST - LOGIN----------------------------------------------------------------

    export const loginController = async (req,res) => {
        try {
            const {email,password} = req.body
            //validation
            if(!email || !password){
                return res.status(404).send({
                    success:false,
                    message:"Invalid email or password"
                })
            }
            //check user
            const user = await userModel.findOne({email})
            if(!user){
                return res.status(404).send({
                    sucsess:false,
                    message:"Email is not registerd"
                })
            }
            const match = await comparePassword(password,user.password)
            if(!match){
                return res.status(200).send({
                    success:false,
                    message:"invalid password"
                })
            }

            //token
            const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
                expiresIn:"7d",
            });
            res.status(200).send({
                success:true,
                message:"login sucessfull",
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    phone:user.email,
                    address:user.address,
                    role:user.role,            
                },
                token,
            });


        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'Error in login',
                error
            })
        }
    };

    //test Controller
    export const testController = (req,res) => {
        //console.log('Protected Route')   //(terminnnnal)
        res.send('protected Route ') ;  //(response in post man)
    }