import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Transaksi from "./TransaksiModels.js";
const Admin = db.define(
    'Admin',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},
{
    tableName:'admin'
}
)

Admin.hasMany(Transaksi,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})

Transaksi.belongsTo(Admin,{
    foreignKey: 'AdminId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})


export default Admin