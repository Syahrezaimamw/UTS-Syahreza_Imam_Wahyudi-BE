import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
const CartBarang = db.define(
    'Cartbarang',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    quantity:{
       type:DataTypes.INTEGER,
       allowNull:false,

   },
    total_price:{
       type:DataTypes.INTEGER,
       allowNull:false,

   }
},
{
    tableName:'cart_barang'
}
)




export default CartBarang