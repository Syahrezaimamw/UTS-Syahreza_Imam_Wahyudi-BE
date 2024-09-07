import db from "../utils/connection.js";
import Barang from "./BarangModels.js";
import Admin from "./AdminModels.js";
import User from "./UserModels.js";
import CartBarang from "./CartBarang.js";
import Transaksi from "./TransaksiModels.js";
await db.sync({force:true})