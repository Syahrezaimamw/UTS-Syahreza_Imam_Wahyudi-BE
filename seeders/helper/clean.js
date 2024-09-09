import Admin from "../../models/AdminModels.js";
import Kendaraan from "../../models/KendaraanModels.js";
import User from "../../models/UserModels.js";
import Peminjaman from "../../models/PeminjamanModels.js";
import Pengembalian from "../../models/PengembalianModels.js";

export default async function clean(){
    await Admin.destroy({
        where:{},
        force:true,
        cascade:true
    })
    await User.destroy({
        where:{},
        force:true,
        cascade:true
    })
    await Kendaraan.destroy({
        where:{},
        force:true,
        cascade:true
    })
    await Pengembalian.destroy({
        where:{},
        force:true,
        cascade:true
    })
    await Peminjaman.destroy({
        where:{},
        force:true,
        cascade:true
    })
}

clean()