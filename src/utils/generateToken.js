import jwt from 'jsonwebtoken';


export const generateToken = (_id, email) =>{
    return  jwt.sign({ _id, email }, "fdiuw894hrkejd9oig43", { expiresIn : "7d"})
}
