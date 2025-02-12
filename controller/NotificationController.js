import { response } from "../message/response.js"
import Notification from "../models/NotificationModels.js"
import User from "../models/UserModels.js"
import Kendaraan from "../models/KendaraanModels.js"

const includeNotification = () => {
    return {
        include: [
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
export const getAllNotification = async (req, res) => {
    try {
        const data = await Notification.findAll(includeNotification())
        response(200, res, 'mengambil seluruh data Notification', data)
    } catch (err) {
        response(500, res, err.message)
    }

}

export const getAllNotificationById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Notification.findByPk(id, includeNotification())
        if (data) {
            response(200, res, `mengambil data berdasarkan id (${id})`, data)
        } else {
            response(200, res, `data tidak ada`, null)
        }
    } catch (err) {
        response(500, res, err.message)
    }

}

export const getAllNotificationByStatus = async (req, res) => {
    try {
        const { status } = req.params; // Mengambil status dari parameter request

        if (!['Diminta', 'Berhasil', 'Gagal'].includes(status)) {
            return response(400, res, `Status tidak valid`, null);
        }

        const data = await Notification.findAll({
            where: { status },
            include: [
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

        if (data.length > 0) {
            response(200, res, `Mengambil data dengan status (${status})`, data);
        } else {
            response(200, res, `Data dengan status (${status}) tidak ditemukan`, null);
        }
    } catch (err) {
        response(500, res, err.message);
    }
};
export const getAllNotificationByIdUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Notification.findAll({
            where: { UserId:  id },
            include:  [
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
export const createNotification = async (req, res) => {
    try {

        if (!req.body.tanggal_peminjaman || !req.body.tanggal_pengembalian || !req.body.UserId) {

            response(400, res, 'Pastikan Semua Data Terisi')
        }
        else {
            const { tanggal_peminjaman, tanggal_pengembalian, total_harga, status, UserId, KendaraanId } = req.body
            const createData = await Notification.create({ tanggal_peminjaman, tanggal_pengembalian, total_harga, status, UserId, KendaraanId, status: true })
            response(201, res, 'data ditambahkan')

        }
    } catch (err) {
        response(500, res, err.message)
    }

}
export const updateNotification = async (req, res) => {
    try {
        const { tanggal_peminjaman, tanggal_pengembalian, total_harga, status, UserId, KendaraanId } = req.body
        const data = await Notification.update({ tanggal_peminjaman, tanggal_pengembalian, total_harga, status, UserId, KendaraanId }, {
            where: {
                id: req.params.id
            }
        })
        response(200, res, 'data berhasil diupdate')
    } catch (err) {
        response(500, res, err.message)
    }

}

export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Notification.destroy({ where: { id } })
        res.status(400).json({ message: 'data dihapus' })
            .end()
    } catch (err) {
        response(500, res, err.message)
    }

}

