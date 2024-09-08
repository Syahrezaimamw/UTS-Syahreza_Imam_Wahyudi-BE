import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Peminjaman from "./PeminjamanModels.js";
const Pengembalian = db.define(
    'Pengembalian', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    tanggal_dikembalikan: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    denda: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    kondisi: {
        type: DataTypes.STRING, //dipinjam 
        allowNull: false,
    },
},
    {
        tableName: 'pengembalian'
    }
)


Peminjaman.hasMany(Pengembalian,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})

Pengembalian.belongsTo(Peminjaman,{
    foreignKey: 'PeminjamanId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})



// await User.sync({force :true})


export default Pengembalian