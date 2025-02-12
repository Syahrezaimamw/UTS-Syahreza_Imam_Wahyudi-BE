import express from 'express'
import { createPeminjaman, deletePeminjaman, getAllPeminjaman, getAllPeminjamanById, getAllPeminjamanByIdUser, updatePeminjaman } from '../controller/PeminjamanController.js'
const RouterPeminjaman=express.Router()

RouterPeminjaman.get('/',getAllPeminjaman)
RouterPeminjaman.get('/find/:id',getAllPeminjamanById)
RouterPeminjaman.get('/findUser/:id',getAllPeminjamanByIdUser)
RouterPeminjaman.post('/create',createPeminjaman)
RouterPeminjaman.put('/update/:id',updatePeminjaman)
RouterPeminjaman.delete('/delete/:id',deletePeminjaman)

export default RouterPeminjaman