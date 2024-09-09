import db from "../utils/connection.js";
import Admin from "./AdminModels.js";
import User from "./UserModels.js";
import Peminjaman from "./PeminjamanModels.js";
import Pengembalian from "./PengembalianModels.js";
import Kendaraan from "./KendaraanModels.js";

await db.sync({force:true})