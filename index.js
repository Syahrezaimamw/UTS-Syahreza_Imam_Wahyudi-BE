import express from 'express';
import db from "./utils/connection.js";
import cors from 'cors'
import 'dotenv/config'
import RouterAdmin from "./router/AdminRouter.js";
import RouterUser from "./router/UserRouter.js";
import RouterKendaraan from "./router/KendaraanRouter.js";
import RouterPeminjaman from "./router/PeminjamanRouter.js";
import RouterPengembalian from "./router/PengembalianRouter.js";

const app =express()

app.use(cors())

app.use(express.json())

app.use('/admin',RouterAdmin)
app.use('/user',RouterUser)
app.use('/kendaraan',RouterKendaraan)
app.use('/peminjaman',RouterPeminjaman)
app.use('/pengembalian',RouterPengembalian)


app.listen(process.env.PORT,()=>{
    console.log('aplikasi sudah berjalan')
})