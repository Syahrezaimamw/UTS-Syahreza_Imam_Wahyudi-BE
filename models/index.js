import db from "../utils/connection.js";
import Admin from "./AdminModels.js";
import Kendaraan from "./KendaraanModels.js";
import User from "./UserModels.js";
import Peminjaman from "./PeminjamanModels.js";
import Notification from "./NotificationModels.js";
import Pengembalian from "./PengembalianModels.js";

await db.sync({force:true})


// export const createKendaraan = async (req, res) => {
//     try {
//         if (!req.body.nama || !req.body.merk || !req.body.harga  || !req.body.nomer_plat  || !req.body.gambar  || !req.body.kategori || !req.body.tipe  || !req.body.warna ) {

//             response(400, res, 'Pastikan Mengisi Semua Data')
//         } else {


//             const { nama, merk, nomer_plat, tahun_pembuatan, kategori, harga, tipe, warna, gambar } = req.body
//             const createData = await Kendaraan.create({ nama, merk, nomer_plat, tahun_pembuatan, kategori, harga, tipe, warna, gambar, status: true })
//             response(201, res, 'data ditambahkan')
//         }
//     } catch (err) {
//         response(500, res, err.message)
//     }

// }