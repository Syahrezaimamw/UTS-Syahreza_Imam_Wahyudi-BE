import { response } from "../message/response.js"
import Admin from "../models/AdminModels.js"
import { hashData, compareData } from "../utils/bycrptData.js"
import jwt from 'jsonwebtoken'

export const getAllAdmin = async (req, res) => {
    try {
        const data = await Admin.findAll(
            {
                attributes: ['id', 'email', 'nama']
            }
        )
        response(200, res, 'mengambil seluruh data admin', data)
    } catch (err) {
        response(500, res, err.message)
    }

}

export const getAllAdminById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Admin.findByPk(id,
            {
                attributes: ['id', 'email', 'nama']
            }
        )
        if (data) {
            response(200, res, `mengambil data berdasarkan id (${id})`, data)
        } else {
            response(200, res, `data tidak ada`, null)
        }
    } catch (err) {
        response(500, res, err.message)
    }

}



export const updateAdmin = async (req, res) => {
    try {
        const { nama, email, password } = req.body
        await Admin.update({ nama, email, password }, {
            where: {
                id: req.params.id
            }
        })
        response(200, res, 'data berhasil diupdate')
    } catch (err) {
        response(500, res, err.message)
    }

}

export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Admin.destroy({ where: { id } })
        res.status(400).json({ message: 'data dihapus' })
            .end()
    } catch (err) {
        response(500, res, err.message)
    }

}

export const registerAdmin = async (req, res) => {
    const { nama, email, password, confPassword } = req.body
    if (!nama || !email || !password || !confPassword) response(400,res,'pastikan semua terisi')
    else {
        if (password !== confPassword)response(400,res,'password dan confirm password tidak cocok') 
        else {
            const resultHash = await hashData(password)
            try {
                await Admin.create(
                    {
                        nama,
                        email,
                        password: resultHash
                    }
                )
                response(201, res, 'Register Berhasil')
            } catch (err) {
                response(500, res, err.message)
            }
        }
    }

}

export const loginAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: {
                email: req.body.email
            }
        })
        const math = await compareData(req.body.password, admin.password)
        if (!math) response(400, res, 'password salah')

        const adminId = admin.id
        const nama = admin.nama
        const email = admin.email

        //? payload
        const accessToken = jwt.sign({ adminId, nama, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        })
        const refreshToken = jwt.sign({ adminId, nama, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        //? simpan refresh token dalam database
        await Admin.update({ refresh_token: refreshToken }, {
            where: {
                id: adminId
            }
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({ accessToken })
    } catch (err) {
        response(500, res, err.message)

    }
}

export const logoutAdmin = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) res.status(204).json({ messgae: 'not Content' })
    const admin = await Admin.findOne({
        where: {
            refresh_token: refreshToken
        }
    })
    if (!admin) res.status(204).json({ messgae: 'not Content' })

    const adminId = admin.id
    await Admin.update({ refresh_token: null }, {
        where: {
            id: adminId
        }
    })
    res.clearCookie('refreshToken')
    response(200, res, 'berhasil logout')
}