import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Peminjaman from "./PeminjamanModels.js";
const Kendaraan = db.define(
    'Kendaraan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    merk: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nomer_plat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tahun_pembuatan: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    kategori: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    warna: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gambar: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
},
    {
        tableName: 'kendaraan'
    }
)


Kendaraan.hasOne(Peminjaman, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Peminjaman.belongsTo(Kendaraan, {
    foreignKey: 'KendaraanId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

export default Kendaraan