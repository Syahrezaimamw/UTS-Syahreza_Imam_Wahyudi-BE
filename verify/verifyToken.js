import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { response } from '../message/response.js';

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) res.sendStatus(401) // unauthorize
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) response(403, res, err) //forbiden
        if (decode) {
            next()
        }
        else {
            res.status(404, res, 'not found')
        }

    })

}