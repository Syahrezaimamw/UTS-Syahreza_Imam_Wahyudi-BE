import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import CartBarang from "./CartBarang.js";
const Barang = db.define(
    'Barang', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
    {
        tableName: 'barang'
    }
)

Barang.hasMany(CartBarang,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})

CartBarang.belongsTo(Barang,{
    foreignKey: 'BarangId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})



// await Barang.sync({ force: true })


export default Barang