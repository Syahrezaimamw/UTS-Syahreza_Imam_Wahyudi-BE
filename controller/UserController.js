import { response } from "../message/response.js"
import User from "../models/UserModels.js"
import { hashData, compareData } from "../utils/bycrptData.js"
export const getAllUser = async (req, res) => {
    try {
        const data = await User.findAll()
        response(200, res, 'mengambil seluruh data User', data)
    } catch (err) {
        response(500, res, err.message)
    }

}

export const getAllUserById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.findByPk(id)
        if (data) {
            response(200, res, `mengambil data berdasarkan id (${id})`, data)
        } else {
            response(200, res, `data tidak ada`, null)
        }
    } catch (err) {
        response(500, res, err.message)
    }

}
export const createUser = async (req, res) => {
    try {
        if (!req.body.nama || !req.body.telephone || !req.body.email || !req.body.alamat || !req.body.no_ktp || !req.body.password || !req.body.gender) {
            response(400, res, 'Pastikan Semua Data Terisi')

        } else {

            const { nama, telephone, email, alamat, no_ktp,password,gender } = req.body
            const resultHash = await hashData(password,gender)
            const createData = await User.create({ nama, telephone, email, alamat, no_ktp,password,gender:resultHash,gender })
            response(201, res, 'data ditambahkan')
        }
    } catch (err) {
        response(500, res, err.message)
    }

}
export const updateUser = async (req, res) => {
    try {
        if (!req.body.nama || !req.body.telephone || !req.body.email || !req.body.alamat || !req.body.no_ktp || !req.body.password || !req.body.gender) {
            response(400, res, 'Pastikan Semua Data Terisi')
        } else {
            const { nama, telephone, email, alamat, no_ktp,password,gender } = req.body
            const data = await User.update({ nama, telephone, email, alamat, no_ktp,password,gender }, {
                where: {
                    id: req.params.id
                }
            })
            response(200, res, 'data berhasil diupdate')
        }
    } catch (err) {
        response(500, res, err.message)
    }

}


export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user !== null) {
            const math = await compareData(req.body.password, user.password)
            if (!math) {
                response(400, res, 'password tidak sesuai dengan email')
            } else {
                response(200, res, 'Mengambil Id User', user)
            }

        } else {

            response(500, res, 'Email Belum Terdaftar')
        }
    } catch (err) {
        response(500, res, err)

    }
}


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({
            where: {
                id: id,
            },
        });

        res.status(200).json({ message: 'Data berhasil dihapus.' })

    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus transaksi.', error });
    }
}
