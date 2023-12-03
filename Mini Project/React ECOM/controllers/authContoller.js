import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from 'jsonwebtoken';
import nodemailer from 'nodemailer';


export const registerContoller = async (req, res) => {
    try {
        console.log("Received registration request #########");
        const { name, email, password, phone, address, answer } = req.body
        //validation
        if (!name) {
            return res.send({ error: 'Name is Required' })
        }

        if (!email) {
            return res.send({ message: 'email is Required' })
        }

        if (!password) {
            return res.send({ message: 'Phone is Required' })
        }
        if (!phone) {
            return res.send({ message: 'email is Required' })
        }

        if (!address) {
            return res.send({ message: 'address is Required' })
        }

        if (!answer) {
            return res.send({ error: 'Answer is Required' })
        }


        //check User
        const exsistingUser = await userModel.findOne({ email: email })
        //Exsisting user ?
        if (exsistingUser) {
            return res.status(200).send({
                success: false,
                message: 'Alredy Registerd , please login',
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)
        if (!hashedPassword) {
            return res.status(500).send({
                success: false,
                message: 'Error in hashing password',
            });
        }

        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save()

        res.status(201).send({
            success: true,
            message: 'user Registration Successful',
            user,

        });
    } catch (error) {
        console.error("Error in registration: ########", error);
        console.log(error)
        res.status(500).send({
            success: false,
            messsage: 'Error in Registration',
            error
        })

    }
};

//export default { registerContoller };

//POST - LOGIN----------------------------------------------------------------

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                sucsess: false,
                message: "Email is not registerd"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "invalid password"
            })
        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "5h",
        });
        res.status(200).send({
            success: true,
            message: "login sucessfull",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
};

//--------------------------------------------------------------------forgot password



//test Controller
export const testController = (req, res) => {
    //console.log('Protected Route')   //(terminnnnal)
    res.send('protected Route ');  //(response in post man)
}
//--------------------------------------------------------------------------------profile update

export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);

        if (password && password.length < 6) {
            return res.json({ error: "Password is required and must be at least 6 characters long" });
        }

        const hashedPassword = password ? await hashPassword(password) : undefined;

        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );

        console.log("Updated User:");

        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser,
        });
    } catch (error) {

        res.status(400).send({
            success: false,
            message: "Error While Updating Profile",
            error,
        });
    }
};
//--------------------------------------------------------------------------------------------------Forgot passwprd------

export const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user exists
        const user = await userModel.findOne({ email });
        console.log('Received email:', email);


        if (!user) {
            return res.status(404).send({
                
                success: false,
                message: 'User not found',
                
            });
        }

        // Generate a password reset token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '5h', 
        });

        // Create a transporter for sending emails (configure with your email provider)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'aliyaaugust27@gmail.com', 
                pass: 'fhpl jkas dbcl qfrh '
            },
         });
                 // Your email password or app-specific password
         

        // Configure email options
        const mailOptions = {
            from: 'aliyaaugust27@gmail.com',
            to: user.email,
            subject: 'Password Reset Link',
            text: `Your password reset link: http://localhost:3000/reset-password/${token}`,
        };

        // Send the email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error);
                return res.status(500).send({
                    success: false,
                    message: 'Failed to send reset password email',
                    error,
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Password reset email sent successfully',
                });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};

//------------------------------------------------------------------------------------reset password 

export const resetPasswordController = async (req, res) => {
    try {
      const { password, token } = req.body;
  
      // Verify the JWT token
      JWT.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
          });
        }
  
        // Find the user by their ID from the token
        const user = await userModel.findById(decodedToken._id);
        
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
        //console.log('Incoming Password:', password);
        //console.log('User Email:', user.email);
  
        // Hash the new password
        const hashedPassword = await hashPassword(password);
        
  
        // Update the user's password

        user.password = hashedPassword;
        await user.save();
        //await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

        
        res.status(200).json({
          success: true,
          message: "Password reset successful",
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  };

  //orders
export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //orders
export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };