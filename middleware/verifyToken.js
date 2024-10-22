import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { response } from '../message/response.js';

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        response(403, res, 'Not Tokken')
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,async (err, decode) => {
            if (err) response(403, res, 'the token is incorrect or has expired') //forbiden 
            if (decode) {
                next()
            }
            else {
                response(404, res, 'not found')
            }

        })
    }

}