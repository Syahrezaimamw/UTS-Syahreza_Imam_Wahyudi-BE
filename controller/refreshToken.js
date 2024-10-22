import Admin from "../models/AdminModels.js";
import jwt from 'jsonwebtoken'

export const refreshToken = async (req, res) => {
    try {
        const rft = req.cookies.refreshToken
        console.log(rft)
        if (!rft) res.status(401).json({ message: 'Unauthorized' })

        const admin = await Admin.findOne({
            where: {
                refresh_token: rft
            }
        })

        if (!admin) res.status(403)

        jwt.verify(rft, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err) res.status(403).json({ message: 'Unverification' })
            const adminId = admin.id
            const nama = admin.nama
            const email = admin.email
            const accesTokenBaru = jwt.sign({ adminId, nama, email }, process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '1h'
                }
            )
            res.json({ accesTokenBaru })
        })
    } catch (err) {
        res.status(500).json(err)
    }

}