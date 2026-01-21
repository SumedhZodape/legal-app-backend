import jwt from 'jsonwebtoken';
import UserModel from '../models/Users.js';

const Protect = async (req, res, next) => {
    console.log(req.headers.authorization)

    let token;

    try {
        if (req.headers?.authorization && req.headers?.authorization.startsWith("Bearer")) {

            token = req.headers?.authorization?.split(" ")[1];

            const decode = await jwt.verify(token, "fdiuw894hrkejd9oig43");
            console.log(decode)

            const user = await UserModel.findById(decode._id);

            if (!user) {
                return res.status(401).json({
                    message: "User Not Found"
                }) 
            }

          

            next()

        }
    } catch (error) {
        res.status(401).json({
            message: "Not Authorized!"
        })
    }


    if (!token) {
        res.status(401).json({
            message: "Please enter valid token"
        })
    }


}


export default Protect;