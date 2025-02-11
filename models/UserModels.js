import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Peminjaman from "./PeminjamanModels.js";
import Notification from "./NotificationModels.js";
const User = db.define(
    'User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_ktp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('Male',"Female"),
        allowNull: false,
    },

},
    {
        tableName: 'user'
    }
)

User.hasMany(Peminjaman, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Peminjaman.belongsTo(User, {
    foreignKey: 'UserId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
User.hasMany(Notification, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Notification.belongsTo(User, {
    foreignKey: 'UserId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})



export default User