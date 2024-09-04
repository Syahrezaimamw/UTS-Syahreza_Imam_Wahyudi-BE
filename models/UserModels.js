import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Book from "./BookModels.js";
const User = db.define(
    //* memberikan penmaan pada models user
    //* allowNull untuk membuat kondisi agar data harus diisi
    'User',{
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
},
{
    tableName:'user'
}
)

//* artinya  user bisa memiliki banyak buku 
User.hasMany(Book,{
    //* cascade digunakan ketika data di table referensi dihapus,maka data yang terkat di table ini juga aka dihapus
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})

//* Buku dimiliki satu user
Book.belongsTo(User,{
    foreignKey: 'Userid',
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})
await User.sync({force :true})


export default User