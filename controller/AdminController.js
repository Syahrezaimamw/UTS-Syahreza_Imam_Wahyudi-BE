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
        const { nama, email,role, password } = req.body
        await Admin.update({ nama, email,role, password }, {
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
    const { nama, email,role, password, confPassword } = req.body
    if (!nama || !email || !password || !role || !confPassword) response(400, res, 'Pastikan Mengisi Semua Data')
    else {
        if (password !== confPassword) response(400, res, 'password dan confirm password tidak cocok')
        else {
            const resultHash = await hashData(password)
            try {
                await Admin.create(
                    {
                        nama,
                        email,
                        role,
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


        if (!req.body.email || !req.body.password) {
            response(400, res, 'Pastikan Mengisi Semua Data')

        } else {

            const admin = await Admin.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (admin !== null) {

                const math = await compareData(req.body.password, admin.password)
                if (!math) {
                    response(400, res, 'password tidak sesuai dengan email')
                } else {
                    const adminId = admin.id
                    const nama = admin.nama
                    const email = admin.email
                    const role = admin.role

                    //? payload
                    const accessToken = jwt.sign({ adminId, nama, email,role }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '1d'
                    })
                    const refreshToken = jwt.sign({ adminId, nama, email,role }, process.env.REFRESH_TOKEN_SECRET, {
                        expiresIn: '1d'
                    })

                    //? simpan refresh token dalam database
                    await Admin.update({ refresh_token: refreshToken }, {
                        where: {
                            id: adminId
                        }
                    })

                    // res.cookie('refreshToken', refreshToken, {
                    //     httpOnly: true,
                    //     maxAge: 24 * 60 * 60 * 1000,

                    // })
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure: false,
                        maxAge: 24 * 60 * 60 * 1000,
                        sameSite: 'None',
                        // secure // atau 'lax', tergantung kebutuhan
                    });



                    res.status(200).json({ accessToken ,refreshToken})
                }
            } else {

                response(500, res, 'Email Belum Terdaftar')
            }
        }
    } catch (err) {
        response(500, res, err)

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



export const loginAdminB = async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: {
                email: req.body.email
            }
        }
        )
        if (admin !== null) {
            const math = await compareData(req.body.password, admin.password)
            if (!math) {
                response(400, res, 'password tidak sesuai dengan email')
            } else {
                response(200, res, 'Mengambil Id Admin', admin.id)
            }

        } else {

            response(500, res, 'Email Belum Terdaftar')
        }
    } catch (err) {
        response(500, res, err)

    }
}