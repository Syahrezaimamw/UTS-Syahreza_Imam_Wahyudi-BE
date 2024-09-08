import express from 'express'
import { getAllAdmin,getAllAdminById,createAdmin, updateAdmin, deleteAdmin } from '../controller/AdminController.js'
const RouterAdmin=express.Router()

RouterAdmin.get('/',getAllAdmin)
RouterAdmin.get('/find/:id',getAllAdminById)
RouterAdmin.post('/create',createAdmin)
RouterAdmin.put('/update/:id',updateAdmin)
RouterAdmin.delete('/delete/:id',deleteAdmin)

export default RouterAdmin