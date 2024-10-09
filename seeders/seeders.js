import User from "../models/UserModels.js"
import Admin from "../models/AdminModels.js"
import Kendaraan from "../models/KendaraanModels.js"
import Peminjaman from "../models/PeminjamanModels.js"
import Pengembalian from "../models/PengembalianModels.js"
import { hashData } from "../utils/bycrptData.js"
const createSeeder = async () => {
    const user = await User.create({
        nama: 'Danish',
        telephone: '089765465467',
        email: 'Danish@gmail.com',
        alamat: 'Gg Rais, Pamulang, Tangerang Selatan',
        no_ktp: 6777493,
    })
    const admin = await Admin.create({
        nama: "Jidan",
        email: 'Jidan@gmail.com',
        password:await hashData('kominfo223')
    })
    const kendaraan1 = await Kendaraan.create({
        nama: 'Astrea',
        merk: 'honda',
        nomer_plat: 'B 1456 CI',
        tahun_pembuatan: 2002,
        kategori: 'sepeda motor',
        harga: 30000,
        tipe: 'Astrea 700',
        warna: 'Hitam',
        gambar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPz9HwPfN3Rfbm_e93OnCNYtQHCk6apMmmPBCBvGLCC8-bdzOmVTkCQNqIaDI8K5AGZi4&usqp=CAU',
        status: true

    })
    const kendaraan2 = await Kendaraan.create({
        nama: 'Civic',
        merk: 'honda',
        nomer_plat: 'AD 5664 MWQ',
        tahun_pembuatan: 2018,
        kategori: 'mobil',
        harga: 200000,
        tipe: 'R',
        warna: 'Hitam',
        gambar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlzLQpTFJLXzPxmp74LGdRBXcpHMmRWwb_XMkxJ-UXrGNLPuCTHA7t6USyI9jeGYSxjVo&usqp=CAU',
        status: false
    })
    const kendaraan3 = await Kendaraan.create({
        nama: 'nMax',
        merk: 'yamaha',
        nomer_plat: 'B 2312 lM',
        tahun_pembuatan: 2018,
        kategori: 'sepeda motor',
        harga: 50000,
        tipe: 'Turbo',
        warna: 'Merah',
        gambar: 'https://sudmoto.be/wp-content/uploads/sites/8/2024_yam_g150_eu_rsh_stu_001_03-1.webp',
        status: true
    })
    const Peminjaman1 = await Peminjaman.create({
        tanggal_peminjaman: '2024-03-01',
        tanggal_pengembalian: '2024-03-03',
        total_harga: 90000,
        status: false,
        AdminId: admin.dataValues.id,
        UserId: user.dataValues.id,
        KendaraanId: kendaraan1.dataValues.id,

    })
    const Peminjaman2 = await Peminjaman.create({
        tanggal_peminjaman: '2024-03-02',
        tanggal_pengembalian: '2024-03-04',
        total_harga: 400000,
        status: true,
        AdminId: admin.dataValues.id,
        UserId: user.dataValues.id,
        KendaraanId: kendaraan2.dataValues.id,

    })
    const Pengembalian2 = await Pengembalian.create({
        tanggal_dikembalikan: '2024-03-05',
        denda: 0,
        kondisi: 'baik seperti semula',
        PeminjamanId: Peminjaman1.dataValues.id,

    })


    const findPeminjamanByUser = await Peminjaman.findAll({
        where: {
            UserId: user.dataValues.id,
        },
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
    })
    return findPeminjamanByUser
}

const userss = await createSeeder()
userss.map((a, i) => {
    console.log(JSON.stringify(a))
})
