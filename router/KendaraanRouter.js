import express from 'express'
import { createKendaraan, deleteKendaraan, getAllKendaraan, getAllKendaraanById, getAllKendaraanByStatus, updateKendaraan,searchKendaraan } from '../controller/KendaraanController.js'
const RouterKendaraan=express.Router()

RouterKendaraan.get('/',getAllKendaraan)
RouterKendaraan.get('/search',searchKendaraan)
RouterKendaraan.get('/find/:id',getAllKendaraanById)
RouterKendaraan.get('/find/status/:status',getAllKendaraanByStatus)
RouterKendaraan.post('/create',createKendaraan)
RouterKendaraan.put('/update/:id',updateKendaraan)
RouterKendaraan.delete('/delete/:id',deleteKendaraan)

export default RouterKendaraan