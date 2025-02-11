import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
const Notification = db.define(
    'Notification', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    tanggal_peminjaman: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tanggal_pengembalian: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total_harga: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Diminta','Berhasil','Gagal'), //dipinjam 
        allowNull: false,
    },
},
    {
        tableName: 'notification'
    }
)



export default Notification