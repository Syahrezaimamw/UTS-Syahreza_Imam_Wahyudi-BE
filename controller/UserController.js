import { response } from "../message/response.js"
import User from "../models/UserModels.js"

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
        response(200, res, `mengambil data berdasarkan id (${id})`, data)
    } catch (err) {
        response(500, res, err.message)
    }

}
export const createUser = async (req, res) => {
    try {
        const { nama, telephone, email, alamat, no_ktp } = req.body
        const createData = await User.create({ nama, telephone, email, alamat, no_ktp })
        response(201, res, 'data ditambahkan')
    } catch (err) {
        response(500, res, err.message)
    }

}
export const updateUser = async (req, res) => {
    try {
        const { nama, telephone, email, alamat, no_ktp } = req.body
        const data = await User.update({ nama, telephone, email, alamat, no_ktp }, {
            where: {
                id: req.params.id
            }
        })
        response(200, res, 'data berhasil diupdate')
    } catch (err) {
        response(500, res, err.message)
    }

}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const data = await User.destroy({ where: { id } })
        res.status(400).json({ message: 'data dihapus' })
            .end()
    } catch (err) {
        response(500, res, err.message)
    }

}

