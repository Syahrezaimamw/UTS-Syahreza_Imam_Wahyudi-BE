import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
const Peminjaman = db.define(
    'Peminjaman', {
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
        type: DataTypes.BOOLEAN, //dipinjam 
        allowNull: false,
    },
},
    {
        tableName: 'peminjaman'
    }
)




// await User.sync({force :true})


export default Peminjaman