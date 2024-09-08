import express from 'express'
import { createKendaraan, deleteKendaraan, getAllKendaraan, getAllKendaraanById, updateKendaraan } from '../controller/KendaraanController.js'
const RouterKendaraan=express.Router()

RouterKendaraan.get('/',getAllKendaraan)
RouterKendaraan.get('/find/:id',getAllKendaraanById)
RouterKendaraan.post('/create',createKendaraan)
RouterKendaraan.put('/update/:id',updateKendaraan)
RouterKendaraan.delete('/delete/:id',deleteKendaraan)

export default RouterKendaraan