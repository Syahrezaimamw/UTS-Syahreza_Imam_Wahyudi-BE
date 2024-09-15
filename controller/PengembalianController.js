import { where } from "sequelize"
import { response } from "../message/response.js"
import Pengembalian from "../models/PengembalianModels.js"
import Peminjaman from "../models/PeminjamanModels.js"
import Admin from "../models/AdminModels.js"
import User from "../models/UserModels.js"
import Kendaraan from "../models/KendaraanModels.js"

const includePengembalian = () => {
    return {
        include: [
            {
                model: Peminjaman,
                as: 'Peminjaman',
                required: true,
                include: [
                    {
                        model: Admin,
                        as: 'Admin',
                        required: true,
                    },
                    {
                        model: User,
                        as: 'User',
                        required: true,
                    },
                    {
                        model: Kendaraan,
                        as: 'Kendaraan',
                        required: true,
                    }
                ]
            },

        ]
    }
}

export const getAllPengembalian = async (req, res) => {
    try {
        const data = await Pengembalian.findAll(includePengembalian())
        response(200, res, 'mengambil seluruh data Pengembalian', data)
    } catch (err) {
        response(500, res, err.message)
    }

}

export const getAllPengembalianById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Pengembalian.findByPk(id, includePengembalian())
        if(data){
            response(200, res, `mengambil data berdasarkan id (${id})`, data)
        }else{
            response(200, res, `data tidak ada`,null )
        }
    } catch (err) {
        response(500, res, err.message)
    }

}
export const createPengembalian = async (req, res) => {
    try {
        const { tanggal_dikembalikan, denda, kondisi, PeminjamanId } = req.body
        const createData = await Pengembalian.create({ tanggal_dikembalikan, denda, kondisi, PeminjamanId })
        response(201, res, 'data ditambahkan')

        //? melakukan perubahan status pada peminjaman
        if (createData) {
            const data = await Peminjaman.findByPk(PeminjamanId)
            const dataPeminjaman = data.dataValues
            const idKendaraan = dataPeminjaman.KendaraanId


            if (data.status === true) {

                const dataKendaraan = await Kendaraan.findByPk(idKendaraan)
                await Peminjaman.update({ ...dataPeminjaman, status: false }, {
                    where: {
                        id: PeminjamanId
                    }
                })

                if (dataKendaraan.status === false) {
                    await Kendaraan.update({ ...dataKendaraan, status: true }, {
                        where: {
                            id: idKendaraan
                        }
                    })
                }

            }
        }

    } catch (err) {
        response(500, res, err.message)
    }

}
export const updatePengembalian = async (req, res) => {
    try {
        const { tanggal_dikembalikan, denda, kondisi, PeminjamanId } = req.body
        const data = await Pengembalian.update({ tanggal_dikembalikan, denda, kondisi, PeminjamanId }, {
            where: {
                id: req.params.id
            }
        })
        response(200, res, 'data berhasil diupdate')
    } catch (err) {
        response(500, res, err.message)
    }

}

export const deletePengembalian = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Pengembalian.destroy({ where: { id } })
        res.status(400).json({ message: 'data dihapus' })
            .end()
    } catch (err) {
        response(500, res, err.message)
    }

}

