import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Book = db.define(
    'Book', {
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
    page: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        tableName: 'book'
    }
)

await Book.sync({ force: true })


export default Book