import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Peminjaman from "./PeminjamanModels.js";
const Admin = db.define(
    'Admin',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    nama:{
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

Admin.hasMany(Peminjaman,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})

Peminjaman.belongsTo(Admin,{
    foreignKey: 'AdminId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})


export default Admin