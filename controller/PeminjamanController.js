import { where } from "sequelize"
import { response } from "../message/response.js"
import Peminjaman from "../models/PeminjamanModels.js"
import Admin from "../models/AdminModels.js"
import User from "../models/UserModels.js"
import Kendaraan from "../models/KendaraanModels.js"

const includePeminjaman = () => {
    return {
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
            },
        ]
    }
}
export const getAllPeminjaman = async (req, res) => {
    try {
        const data = await Peminjaman.findAll(includePeminjaman())
        response(200, res, 'mengambil seluruh data Peminjaman', data)
    } catch (err) {
        response(500, res, err.message)
    }

}

export const getAllPeminjamanById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Peminjaman.findByPk(id, includePeminjaman())
        if(data){
            response(200, res, `mengambil data berdasarkan id (${id})`, data)
        }else{
            response(200, res, `data tidak ada`,null )
        }
    } catch (err) {
        response(500, res, err.message)
    }
    
}

export const createPeminjaman = async (req, res) => {
    try {

        if(!req.body.tanggal_peminjaman || !req.body.tanggal_pengembalian || !req.body.UserId){
            
            response(400, res, 'Pastikan Semua Data Terisi')
        }
        else{

            
            const { tanggal_peminjaman, tanggal_pengembalian, total_harga, status, AdminId, UserId, KendaraanId } = req.body
            const createData = await Peminjaman.create({ tanggal_peminjaman, tanggal_pengembalian, total_harga, status, AdminId, UserId, KendaraanId, status: true })
            response(201, res, 'data ditambahkan')
            
            //* mengubah status kendaraan menjadi false
            if (createData) {
                const data = await Kendaraan.findByPk(KendaraanId)
                const dataKendaraan = data.dataValues
                if (data.status === true) {
                    await Kendaraan.update({ ...dataKendaraan, status: false }, {
                    where: {
                        id: KendaraanId
                    }
                })
            }
        }
    }
    } catch (err) {
        response(500, res, err.message)
    }

}

export const getAllPeminjamanByIdUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Peminjaman.findAll({
            where: { UserId:  id },
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
                },
            ]
        });
        if (data) {
            response(200, res, `mengambil data berdasarkan id (${id})`, data)
        } else {
            response(200, res, `data tidak ada`, null)
        }
    } catch (err) {
        response(500, res, err.message)
    }

}

export const updatePeminjaman = async (req, res) => {
    try {
        const { tanggal_peminjaman, tanggal_pengembalian, total_harga, status, AdminId, UserId, KendaraanId } = req.body
        const data = await Peminjaman.update({ tanggal_peminjaman, tanggal_pengembalian, total_harga, status, AdminId, UserId, KendaraanId }, {
            where: {
                id: req.params.id
            }
        })
        response(200, res, 'data berhasil diupdate')
    } catch (err) {
        response(500, res, err.message)
    }

}

export const deletePeminjaman = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Peminjaman.destroy({ where: { id } })
        res.status(400).json({ message: 'data dihapus' })
            .end()
    } catch (err) {
        response(500, res, err.message)
    }

}

