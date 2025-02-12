import express from 'express'
import { createPengembalian, deletePengembalian, getAllPengembalian, getAllPengembalianById, getAllPengembalianByIdUser, updatePengembalian } from '../controller/PengembalianController.js'
const RouterPengembalian=express.Router()

RouterPengembalian.get('/',getAllPengembalian)
RouterPengembalian.get('/find/:id',getAllPengembalianById)
RouterPengembalian.get('/findUser/:id',getAllPengembalianByIdUser)
RouterPengembalian.post('/create',createPengembalian)
RouterPengembalian.put('/update/:id',updatePengembalian)
RouterPengembalian.delete('/delete/:id',deletePengembalian)

export default RouterPengembalian