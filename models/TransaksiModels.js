import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import CartBarang from "./CartBarang.js";
const Transaksi = db.define(
    'Transaksi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        tableName: 'transaksi'
    }
)

CartBarang.hasOne(Transaksi, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Transaksi.belongsTo(CartBarang, {
    foreignKey: 'CartbarangId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})



// await User.sync({force :true})


export default Transaksi