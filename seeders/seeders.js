import User from "../models/UserModels.js"
import Admin from "../models/AdminModels.js"
import Kendaraan from "../models/KendaraanModels.js"
import Peminjaman from "../models/PeminjamanModels.js"
import Pengembalian from "../models/PengembalianModels.js"
const createSeeder = async () => {
    const user = await User.create({
        nama: 'Danish',
        telephone: '089765465467',
        email: 'Danishgmail.com',
        alamat: 'Gg Rais, Pamulang, Tangerang Selatan',
        no_ktp:6777493,
    })
    const admin = await Admin.create({
        nama: "Jidan",
        email: 'Jidan@gmail.com',
        password: 'kominfo124'
    })
    const kendaraan1 = await Kendaraan.create({
        nama: 'astrea',
        merk: 'honda',
        nomer_plat: 'B 1456 CI',
        tahun_pembuatan: 2002,
        kategori: 'sepeda motor',
        harga: 800000,
        tipe: 'Astrea 700',
        warna: 'hitam',
        gambar: 'https://img4.icarcdn.com/851531/prev-desktop_10-motor-honda-astrea-yang-pernah-dijual-di-indonesia-mulai-astrea-700-sampai-legenda-2-135158_000000851531_befd901e_4c61_4078_b5d5_00eeaeb36ac9.jpg'

    })
    const kendaraan2 = await Kendaraan.create({
        nama: 'civic',
        merk: 'honda',
        nomer_plat: 'AD 5664 MWQ',
        tahun_pembuatan: 2018,
        kategori: 'mobil',
        harga: 2000000,
        tipe: 'R',
        warna: 'merah',
        gambar: 'https://img5.icarcdn.com/1203436/gallery_used-car-mobil123-honda-civic-type-r-hatchback-indonesia_1203436_t34TSEVBbgfY396Ru7fkkp.jpg?smia=xTM'

    })

    const Peminjaman1 = await Peminjaman.create({
        tanggal_peminjaman: '2024-03-02',
        tanggal_pengembalian: '2024-03-05',
        total_harga: 240000,
        status: false,
        AdminId: admin.dataValues.id,
        UserId: user.dataValues.id,
        KendaraanId: kendaraan1.dataValues.id,

    })
    const Peminjaman2 = await Peminjaman.create({
        tanggal_peminjaman: '2024-03-02',
        tanggal_pengembalian: '2024-03-04',
        total_harga: 4000000,
        status: true,
        AdminId: admin.dataValues.id,
        UserId: user.dataValues.id,
        KendaraanId: kendaraan2.dataValues.id,

    })
    const Pengembalian2 = await Pengembalian.create({
        tanggal_dikembalikan: '2024-03-05',
        denda: 0,
        kondisi:'baik seperti semula',
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
