import { where } from "sequelize"
import { response } from "../message/response.js"
import Kendaraan from "../models/KendaraanModels.js"

export const getAllKendaraan = async (req, res) => {
    try {
        const data = await Kendaraan.findAll()
        response(200, res, 'mengambil seluruh data Kendaraan', data)
    } catch (err) {
        response(500, res, err.message)
    }

}

export const getAllKendaraanById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Kendaraan.findByPk(id)
        if (data) {
            response(200, res, `mengambil data berdasarkan id (${id})`, data)
        } else {
            response(200, res, `data tidak ada`, null)
        }
    } catch (err) {
        response(500, res, err.message)
    }

}

export const getAllKendaraanByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const kendaraan = await Kendaraan.findAll({
            where: { status } 
        });
        console.log(kendaraan.length)

        if (kendaraan.length === 0) {
            response(404, res, `Kendaraan dengan status ( Penuh ) tidak ditemukan`)
        }else {

            response(200, res, `mengambil data berdasarkan status ( Kosong )`, kendaraan)
        }

    } catch (err) {
        response(500, res, err.message)
    }

}

export const createKendaraan = async (req, res) => {
    try {
        if (!req.body.nama || !req.body.merk || !req.body.harga  || !req.body.nomer_plat  || !req.body.gambar  || !req.body.kategori || !req.body.tipe  || !req.body.warna ) {

            response(400, res, 'Pastikan Mengisi Semua Data')
        } else {


            const { nama, merk, nomer_plat, tahun_pembuatan, kategori, harga, tipe, warna, gambar } = req.body
            const createData = await Kendaraan.create({ nama, merk, nomer_plat, tahun_pembuatan, kategori, harga, tipe, warna, gambar, status: true })
            response(201, res, 'data ditambahkan')
        }
    } catch (err) {
        response(500, res, err.message)
    }

}
export const updateKendaraan = async (req, res) => {
    try {
        if (!req.body.nama || !req.body.merk || !req.body.harga  || !req.body.nomer_plat  || !req.body.gambar  || !req.body.kategori || !req.body.tipe  || !req.body.warna ){
            response(400, res, 'Pastikan Mengisi Semua Data')

        }
        else{

            const { nama, merk, nomer_plat, tahun_pembuatan, kategori, harga, tipe, warna, gambar } = req.body
            const data = await Kendaraan.update({ nama, merk, nomer_plat, tahun_pembuatan, kategori, harga, tipe, warna, gambar }, {
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

export const deleteKendaraan = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Kendaraan.destroy({ where: { id } })
        res.status(400).json({ message: 'data dihapus' })
            .end()
    } catch (err) {
        response(500, res, err.message)
    }

}

